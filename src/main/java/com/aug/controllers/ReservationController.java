/**
 *
 * @author natechanok
 * @date Oct 22, 2015
 */

package com.aug.controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.TimeZone;

import javax.sql.DataSource;

import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.jasperreports.JasperReportsMultiFormatView;

import com.aug.hrdb.dto.ReportReservationDto;
import com.aug.hrdb.dto.ReservationDto;
import com.aug.hrdb.entities.Reservation;
import com.aug.hrdb.services.ReservationService;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Login;
import com.aug.hrdb.entities.MasDivision;
import com.aug.hrdb.entities.MasReservationType;
import com.aug.hrdb.entities.Room;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.LoginService;
import com.aug.hrdb.services.MasDivisionService;
import com.aug.hrdb.services.MasReservationTypeService;
import com.aug.hrdb.services.RoomService;


@Controller
public class ReservationController {
	
	@Autowired
	private ReservationService reservationService;
	
	@Autowired
	private EmployeeService employeeService;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private RoomService roomService;
	
	@Autowired
	private MasDivisionService masDivisionService;
	
	@Autowired
	private MasReservationTypeService masReservationTypeService;

	@Autowired
	private ApplicationContext appContext;
	
	@Autowired
	private DataSource dataSource;
	
	@ModelAttribute("rooms")
	public List<Room> roomList(){
		return roomService.findAll();
	}
	
	@ModelAttribute("divisions")
	public List<MasDivision> masDivisionsList(){
		return masDivisionService.findAll();
	}
	
	@ModelAttribute("reservationTypes")
	public List<MasReservationType> reservationTypeList(){
		return masReservationTypeService.findAll();
	}
	
	@Transactional
	@RequestMapping(value="/reservation",method=RequestMethod.GET)
	public ModelAndView reservationPage(){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		Login login = loginService.findByUserName(userDetails.getUsername());
		Employee employee = login.getEmployee();
		ModelAndView model = new ModelAndView();
		model.addObject("employeeId", employee.getId());
		model.addObject("firstNameEn", employee.getApplicant().getFirstNameEN());
		model.addObject("lastNameEn", employee.getApplicant().getLastNameEN());
		model.setViewName("/HrSystem/reservation");
		return model;
	}
	
	@RequestMapping(value="/reservation/ajax/getAllReservation",method=RequestMethod.POST)
	public @ResponseBody List<ReservationDto> findAllReservation(@RequestParam(value="start") String start,
			@RequestParam(value="end") String end, @RequestParam(value="_",required = false) String underscore, 
			@RequestParam(value="timezone",required = false) String timezone) throws ParseException {
		    System.out.println("start : "+start+"   end : "+end);
			List<ReservationDto> reservations = new ArrayList<ReservationDto>();
			reservations = reservationService.findByDateRange(start, end);
			System.out.println(reservations.size());
		return reservations;
	}
	
	@RequestMapping(value="/reservation/ajax/getReservation/{id}", method=RequestMethod.GET)
	public @ResponseBody ReservationDto findReservation(@PathVariable Integer id){
		ReservationDto reservation = reservationService.findReservationById(id);
		return reservation;
	}
	
	@RequestMapping(value="/reservation/insertReservation",method=RequestMethod.POST)
		public @ResponseBody ReservationDto insertReservation(@RequestBody Reservation reservation) {
		
			/*                Change time for insert                      */
			Date dateStart = reservation.getStart();//get date from calendar
			Date dateEnd = reservation.getEnd();
			DateFormat formatterDate = new SimpleDateFormat("yyyy-MM-dd",Locale.ENGLISH);
			
			DateFormat formatter = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss",Locale.ENGLISH);
			formatter.setTimeZone(TimeZone.getTimeZone("GMT"));//set Timezone to be GMT
			
			String startString = formatter.format(dateStart);//convert date's timezone but it return String
			String endString = formatter.format(dateEnd);
			
			if ( reservationService.findByTimestamp(startString, reservation.getRoom().getId()).size() == 0 && reservationService.findByTimestamp(endString, reservation.getRoom().getId()).size() == 0 && reservationService.findByBetween(startString, endString, reservation.getRoom().getId()).size()==0) {
			
				System.out.println("Can");
			DateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss", Locale.ENGLISH);//new format to convert String to Date
				try {
					//System.out.println(format.parse(startString));
					reservation.setStart(format.parse(startString));//set date with new timezone 
					reservation.setDateReservation(reservation.getStart());
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				
				try {
					//System.out.println(format.parse(endString));
					reservation.setEnd(format.parse(endString));
				} catch (ParseException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
				reservationService.create(reservation);
				return reservationService.findReservationById(reservation.getId());
			} else {
				System.out.println("Can't");
				return new ReservationDto();
			}
		}
	
	@RequestMapping(value="/reservation/ajax/updateDateTime", method=RequestMethod.POST)
	public @ResponseBody ReservationDto updateGetDateTime(@RequestBody Reservation reservation){
		Reservation reservationToUpdate = reservationService.findById(reservation.getId());
		reservationToUpdate.setId(reservation.getId());
		reservationToUpdate.setDateReservation(reservation.getStart());
		reservationToUpdate.setStart(reservation.getStart());
		reservationToUpdate.setEnd(reservation.getEnd());
		reservationService.update(reservationToUpdate);
		return reservationService.findReservationById(reservation.getId());
	}
	
	@RequestMapping(value="/reservation/ajax/updateData", method=RequestMethod.POST)
	public @ResponseBody ReservationDto updateData(@RequestBody Reservation reservation){
		Reservation reservationToUpdate = reservationService.findById(reservation.getId());
		reservationToUpdate.setId(reservation.getId());
		reservationToUpdate.setRoom(reservation.getRoom());
		reservationToUpdate.setDescription(reservation.getDescription());
		reservationToUpdate.setMasreservationtype(reservation.getMasreservationtype());
		reservationToUpdate.setMasDivision(reservation.getMasDivision());
		//reservationToUpdate.setReservationBy(reservation.getReservationBy());
		reservationService.update(reservationToUpdate);
		return reservationService.findReservationById(reservation.getId());
	}
	
	
	@RequestMapping(value = "/reservation/ajax/deleteReservation/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteReservation(@PathVariable Integer id) {
		ReservationDto reservationDto;
		String returnTitle ;
		try{
			reservationDto = reservationService.findReservationById(id);
			returnTitle = reservationDto.getTitle();
		}catch(Exception e){
			return e.getMessage();
		}
		reservationService.deleteById(id);
	return returnTitle;
	}
	
	@RequestMapping(value = "/reservation/ajax/searchReservation", method = RequestMethod.GET)
	public @ResponseBody List<ReservationDto> searchReservation(@RequestParam String reservationBy, @RequestParam Integer masDivision, @RequestParam Integer masreservationtype) {
		return reservationService.searchReservation(reservationBy, masDivision, masreservationtype);
	}
	
	@RequestMapping(value = "reservation/report", method = RequestMethod.GET)
	public String reservationReport() {
		return "HrSystem/reservationReport";
	}

	@RequestMapping(value = "reservation/report/findReservationReport", method = RequestMethod.POST)
	public @ResponseBody List<ReportReservationDto> reservationReport( @RequestParam(required=false,defaultValue= "-1" )Integer roomId,
			@RequestParam(required=false,defaultValue= "-1" ) Integer reservationTypeId,
			@RequestParam(required=false,defaultValue= "-1" ) Integer divisionId,
			@RequestParam(required=false,defaultValue= "" ) String reservationBy) throws Exception {
		System.out.println("roomId : " + roomId);
		System.out.println("reservationTypeId : " + reservationTypeId);
		System.out.println("divisionId : " + divisionId);
		System.out.println("reservationBy : " + reservationBy);
//		reservationBy.trim();
		final List<ReportReservationDto> data;
		data = reservationService.findReservation(roomId, reservationTypeId, divisionId, reservationBy);

		return data;
	}
	
	@RequestMapping(value = "reservation/filterReservation", method = RequestMethod.POST)
	public @ResponseBody List<ReservationDto> filterReservation(@RequestParam(value="start") String start,
			@RequestParam(value="end") String end, @RequestParam(value="_",required = false) String underscore, 
			@RequestParam(value="timezone",required = false) String timezone, @RequestParam String reserveBy,
			@RequestParam Integer roomId,@RequestParam Integer reservationTypeId, @RequestParam Integer divisionId){
		
		return reservationService.filterReservation(start, end, roomId, reservationTypeId, divisionId, reserveBy);
	}
	
//	@RequestMapping(value = "reservation/report/review/{reportType}/{room}/{reservationType}/{masDivisionInsert}/{reservationBy}", method = RequestMethod.GET)
//	public ModelAndView reportReservationPreview (@PathVariable String reportType,@RequestParam(required=false,defaultValue= "-1" )Integer roomId,
//			@RequestParam(required=false,defaultValue= "-1" ) Integer reservationTypeId,
//			@RequestParam(required=false,defaultValue= "-1" ) Integer divisionId,
//			@RequestParam(required=false,defaultValue= "empty" ) String reservationBy){
//		
//		System.out.println("roomId : " + roomId);
//		System.out.println("reservationTypeId : " + reservationTypeId);
//		System.out.println("divisionId : " + divisionId);
//		System.out.println("reservationBy : " + reservationBy);
//		List<ReportReservationDto> reportReservationDto = reservationService.findReservation(roomId, reservationTypeId, divisionId, reservationBy);
//			
//		Map<String, Object> parameterMap = new HashMap<String, Object>();
//		String roomId1 = "";
//		String reservationTypeId1 = "";
//		String divisionId1 = "";
//		String reservationBy1 ="";
//		
//		if( !StringUtils.isEmpty(reservationBy1)&& reservationBy1.length()>0){
//			reservationBy1 = " AND reservation.RESERVATIONBY = '"+reservationBy1+"'";
//		}
//		
//		if(roomId > 0){
//			roomId1 = " AND room.ID = "+roomId;
//		}
//		
//		if(reservationTypeId > 0 ){
//			reservationTypeId1 = " AND masreservationtype.ID = "+reservationTypeId;
//		}
//		
//		if(divisionId > 0 ){
//			divisionId1 = " AND masdivision.ID = "+divisionId;
//		}
//	
//		parameterMap.put(JRParameter.REPORT_LOCALE, Locale.ENGLISH);
//
//		parameterMap.put("format", reportType);
//
//		  
//
//		  JasperReportsMultiFormatView view = new JasperReportsMultiFormatView();
//
//		  view.setJdbcDataSource(dataSource);
//
//		  view.setUrl("classpath:reports/reservationReport.jasper");
//
//		  view.setApplicationContext(appContext);
//		  return new ModelAndView(view, parameterMap);
//
//	}
	
	@RequestMapping(value = "reservation/report/review/{reportType}/{roomId}/{reservationTypeId}/{divisionId}/{reservationBy}", method = RequestMethod.GET)
	public ModelAndView reportPreview (@PathVariable String reportType,@PathVariable Integer roomId,
			@PathVariable Integer reservationTypeId,
			@PathVariable Integer divisionId,
			@PathVariable String reservationBy){
		
		System.out.println("roomId aa: " + roomId);
		System.out.println("reservationTypeId aa: " + reservationTypeId);
		System.out.println("divisionId aa: " + divisionId);
		System.out.println("reservationBy aa: " + reservationBy);
		
		if(reservationBy.equals("null")){
			reservationBy = "";
		}
		List<ReportReservationDto> reportReservationDto = reservationService.findReservation(roomId, reservationTypeId, divisionId,reservationBy);
			
		Map<String, Object> parameterMap = new HashMap<String, Object>();

		  JRDataSource jrDataSource = new JRBeanCollectionDataSource(reportReservationDto);

		  parameterMap.put("dataSource", jrDataSource);

		  parameterMap.put("format", reportType);

		  JasperReportsMultiFormatView view = new JasperReportsMultiFormatView();

		  view.setUrl("classpath:reports/report_Reservation.jrxml");

		  view.setApplicationContext(appContext);

		  

		  return new ModelAndView(view, parameterMap);

	}
	
}
