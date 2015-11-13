/**
 *
 * @author Pranrajit
 * @date 25 พ.ค. 2558
 */
package com.aug.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.joda.time.DateTime;
import org.joda.time.Hours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.hrdb.dto.LeaveDto;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Leave;
import com.aug.hrdb.services.AimEmployeeDtoService;
import com.aug.hrdb.services.EmployeeDtoService;
import com.aug.hrdb.services.LeaveDtoService;
import com.aug.hrdb.services.LeaveService;
import com.aug.hrdb.services.MasLeaveTypeService;



@Controller
public class LeaveController {
 
	@Autowired private LeaveService leaveService;
	@Autowired private MasLeaveTypeService masLeaveTypeService;
	@Autowired private LeaveDtoService leaveDtoService;
	@Autowired private AimEmployeeDtoService aimEmployeeDtoService;
	@Autowired private EmployeeDtoService employeeDtoService;
	
	private final static Logger logger = Logger
			.getLogger(Leave.class);
	
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		 SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy HH:mm",Locale.ENGLISH);
	     CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
	     binder.registerCustomEditor(Date.class, editor);
     
    }	
	
	
	
	@RequestMapping(value="/leave/{id}",method={RequestMethod.GET,
			RequestMethod.POST})
	public String listleave(HttpSession session,Locale locale, ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute LeaveDto leaveDto){
		model.addAttribute("masleavetypeList",masLeaveTypeService.findAll());
		model.addAttribute("aimList",aimEmployeeDtoService.listEmployeeAim());
		
		leaveDto.setEmployeeId(id);
		model.addAttribute("id", leaveDto.getEmployeeId());
		return "/HrSystem/leave";
		
		
	}
	
	@RequestMapping(value ="/leave/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<LeaveDto> listAll(@PathVariable("id") Integer id){
		
		//findOfficial(id);
		return (List<LeaveDto>) leaveDtoService.searchLeave(id);
	}
	
	
	
	@SuppressWarnings("deprecation")
	@RequestMapping(value="/leave/add",method=RequestMethod.POST)
	public @ResponseBody LeaveDto addLeave(Locale locale,
			@ModelAttribute LeaveDto leaveDate,
			ModelMap model){

		Leave leave = new Leave();
		List<Leave> findLeaveTypeAmount =new ArrayList<Leave>();
		findLeaveTypeAmount = leaveService.findLeaveType(leaveDate.getMasleavetypeId(),leaveDate.getEmployeeId());
		

		
		int dateNo;
		int hoursNo = 0;
		int hoursNo2 = 0;
		int hoursNo3 = 0;
		int sum=0;

		
		
	 	DateTime dt1 = new DateTime(leaveDate.getStartTime());
		DateTime dt2 = new DateTime(leaveDate.getEndTime());
		int dateNumber = Hours.hoursBetween(dt1, dt2).getHours() / 24;
		//System.out.print(Hours.hoursBetween(dt1, dt2).getHours() / 24 + " hours, ");
		
		if(dateNumber==0){
			
			if(leaveDate.getEndTime().getHours()>12&&leaveDate.getStartTime().getHours()<12){
					hoursNo = (leaveDate.getEndTime().getHours() - leaveDate.getStartTime().getHours())-1;
			}else{
					hoursNo = (leaveDate.getEndTime().getHours() - leaveDate.getStartTime().getHours());

			}
			System.out.println("hoursNo#####: "+hoursNo);
			sum+=hoursNo;
		}else if(dateNumber!=0){
			
			for(int i=1;i<=dateNumber;i++){
			
			  if(i==1){
				  
				if(leaveDate.getStartTime().getHours()<12){
					hoursNo = (18-leaveDate.getStartTime().getHours())-1;
					System.out.println("aaa");
					System.out.println("i: "+i);
				}else{
					hoursNo = (18-leaveDate.getStartTime().getHours());
				}
			  }if(dateNumber==i){
				System.out.println("i: "+i);
				if(leaveDate.getEndTime().getHours()>12){
					hoursNo2 = (leaveDate.getEndTime().getHours()-9)-1;
				}else{
					hoursNo2 = (leaveDate.getEndTime().getHours()-9);
				}
			  }if(i!=1){
				 System.out.println("i: "+i);
				 hoursNo3 = hoursNo3+8;
				  
			  }
			  
			}
			System.out.println("hoursNo#1: "+hoursNo);
			System.out.println("hoursNo#2: "+hoursNo2);
			System.out.println("hoursNo#3: "+hoursNo3);
			sum+=hoursNo+hoursNo2+hoursNo3;
			System.out.println("sum: "+leave.getSumTime());
		}
		
		
		/*int perSumTime =0 ;
		
		for(Leave Leave:findLeaveTypeAmount)
			
		{
			
			perSumTime+=leave.getSumTime();
			logger.info("perSumTime"+" "+perSumTime);
			
			logger.info("findLeaveTypeAmount"+" "+Leave.getSumTime());
			
		
		}*/
		
	
		
		
		leaveService.create(leave.fromLeaveDto(leaveDate,leave,new Integer(sum)));
		
		return leaveDate;
	}
	
	
	@RequestMapping(value="/leave/findById/{leaveid}",method={ RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody LeaveDto findById(@PathVariable ("leaveid")Integer leaveid)
	{
		Leave leave = leaveService.findById(leaveid);
		return leave.toLeaveDto();
	}
	
	/*@Transactional
	@RequestMapping(value="/leave/update",method=RequestMet hod.POST)
	public @ResponseBody LeaveDto ubdateLeave(@RequestBody LeaveDto leaveDto){
			
		Leave leave = new Leave();
		leaveService.update(leave.fromLeaveDto(leaveDto));
			return leaveDto;
	}*/
	
	
	@RequestMapping(value = "/leave/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody LeaveDto ubdateLeave( Locale locale,
			@ModelAttribute LeaveDto leaveDto,
			ModelMap model) {
		Leave leave = leaveService.findById(leaveDto.getId());
		
		
		int dateNo;
		int hoursNo = 0;
		int hoursNo2 = 0;
		int hoursNo3 = 0;
		int sum=0;

	 	DateTime dt1 = new DateTime(leaveDto.getStartTime());
		DateTime dt2 = new DateTime(leaveDto.getEndTime());
		int dateNumber = Hours.hoursBetween(dt1, dt2).getHours() / 24;
		//System.out.print(Hours.hoursBetween(dt1, dt2).getHours() / 24 + " hours, ");
		
		if(dateNumber==0){
			
			hoursNo = (leaveDto.getEndTime().getHours() - leaveDto.getStartTime().getHours())-1;
			System.out.println("hoursNo#####: "+hoursNo);
			sum=hoursNo;
		}else if(dateNumber!=0){
			
			for(int i=1;i<=dateNumber;i++){
			
			  if(i==1){
				hoursNo = (18-leaveDto.getStartTime().getHours())-1;
				System.out.println("aaa");
				System.out.println("i: "+i);
			  }else if(dateNumber==i){
				System.out.println("i: "+i);
				hoursNo2 = (leaveDto.getEndTime().getHours()-9)-1;
			  }else if(i!=1){
				 System.out.println("i: "+i);
				 hoursNo3 = 8;
				  
			  }		  
				
			}
			
			System.out.println("hoursNo#1: "+hoursNo);
			System.out.println("hoursNo#2: "+hoursNo2);
			System.out.println("hoursNo#3: "+hoursNo3); 
			sum=hoursNo+hoursNo2+hoursNo3;
			System.out.println("sum: "+leave.getSumTime());

		}
		
		Leave leaveUpdate = leave.fromLeaveDto(leaveDto,leave,new Integer(sum));
		leaveService.update(leaveUpdate);
		
		
		
		return leave.toLeaveDto();
	}
	
	
	
	
	@RequestMapping(value="/leave/delete/{leaveid}",method=RequestMethod.POST)
	public @ResponseBody String deleteById(@PathVariable("leaveid") Integer leaveid){
		
		leaveService.deleteById(leaveid);
		
		return "redirect:/leave";
	
	
	}
	
	
	
	/*public int findOfficial(Integer id){
		
		Employee employeeOff = employeeDtoService.findOfficial(id);
		
		Date startWork =	employeeOff.getOfficial().getStartWorkDate();
		
		GregorianCalendar startWorkCalendar	 = new GregorianCalendar();
		startWorkCalendar.setTime(startWork);
		
		
		GregorianCalendar currentCalendar	 = new GregorianCalendar();
		currentCalendar.setTime(new Date());
		
		System.out.println("===================diffYear :"+(currentCalendar.get(Calendar.YEAR)- startWorkCalendar.get(Calendar.YEAR)));
		System.out.println("===================diffMOnth :"+(currentCalendar.get(Calendar.MONTH)- startWorkCalendar.get(Calendar.MONTH)));
		int sumMonth=((currentCalendar.get(Calendar.YEAR)- startWorkCalendar.get(Calendar.YEAR))*12)+
				(currentCalendar.get(Calendar.MONTH)- startWorkCalendar.get(Calendar.MONTH));
		int dayForAnnual=0;
		
		
		if(sumMonth<5){
			
			dayForAnnual=0;
			
		}else if(sumMonth==5){
			
			dayForAnnual=3;
			
		}else if(sumMonth==6){
			
			dayForAnnual=4;
			
		}else if(sumMonth==7){
			
			dayForAnnual=5;
			
		}else if(sumMonth==8){
			
			dayForAnnual=6;
			
		}else if(sumMonth==9){
			dayForAnnual=7;
			
		}else if(sumMonth==10){
			dayForAnnual=8;
			
		}else if(sumMonth==11){
			dayForAnnual=9;
			
		}else if(sumMonth==12){
			dayForAnnual=10;
			
		}else if(sumMonth>12 || sumMonth<=60){
			dayForAnnual=10;
			
		}else if(sumMonth>60){
			dayForAnnual=15;
		}
		
		logger.info("sumMonth"+" "+sumMonth);
		logger.info("dayForAnnual"+" "+dayForAnnual);
		
		
//		Integer currentYear=gc.get(Calendar.YEAR);
//		Integer currentMonth=gc.get(Calendar.MONTH)+1;
		
		 Calendar cal = Calendar.getInstance();
			
		Integer currentYear1=cal.get(Calendar.YEAR);
		Integer currentMonth1=cal.get(Calendar.MONTH);
		
	
		
//		Integer	years=gc.get(Calendar.YEAR);
		
	
		
		
		Integer	years1=employeeOff.getOfficial().getStartWorkDate().getYear();
		
		
		Integer	months=startWork.getMonth()+1;
		
		
		
		Integer diffYear=currentYear-startWork.getYear();
		Integer diffMonth=currentMonth-months;
		
		
		logger.info("findOfficial"+" "+startWork);
		logger.info("currentYear"+" "+currentYear);
		logger.info("currentYear1"+" "+currentYear1);
		logger.info("years"+" "+years);
		logger.info("years1"+" "+years1);
		logger.info("diffYear"+" "+diffYear);
		
		logger.info("currentMonth"+" "+currentMonth);
		logger.info("currentMonth1"+""+currentMonth1);
		logger.info("months"+" "+months);
		logger.info("diffMonth"+" "+diffMonth);
		int a=1;
		
		return a;
		
	}*/
	
	
	
	
	@ModelAttribute("leave")
	Leave setupForm(){
		return new Leave();
	}
	
}
