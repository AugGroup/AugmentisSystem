package com.aug.controllers;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.hrdb.dto.AugRequestDto;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.AugRequest;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Login;
import com.aug.hrdb.entities.MailTemplate;
import com.aug.hrdb.entities.MasJobLevel;
import com.aug.hrdb.entities.MasTechnology;
import com.aug.hrdb.services.AugRequestService;
import com.aug.hrdb.services.LoginService;
import com.aug.hrdb.services.MailTemplateService;
import com.aug.hrdb.services.MasJobLevelService;
import com.aug.hrdb.services.MasTechnologyService;
import com.aug.services.EmailService;

@Controller
public class JobcaseController implements Serializable {

	private static final long serialVersionUID = 1L;
	
	@Autowired 
	private AugRequestService augRequestService;
	
	@Autowired
	private LoginService loginService;
	
	@Autowired
	private MasJobLevelService masJoblevelService;
	
	@Autowired
	private MasTechnologyService masTechnologyService;
	
	@Autowired
	private MailTemplateService mailTemplateService;
	
	@Autowired
	private EmailService emailService;
	
//	@Transactional
	@RequestMapping(value = "/request", method = { RequestMethod.GET})
	public String listRequest(Model model){
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println("userName : " + userDetails.getUsername());
//		Employee employee = login.getEmployee();
//		Hibernate.initialize(employee.getApplicant());

//		model.addAttribute("employee", employee);
		return "augRequest";
	}
	
	/*-------------------- Search All Request ----Exception handler-------------*/
	@RequestMapping(value = "/request/search", method = { RequestMethod.POST, RequestMethod.GET })
	public @ResponseBody Object findAllRequest() throws Exception{
		final List<AugRequestDto> data = augRequestService.findAllAugRequest();
		if(data == null){
			throw new NullPointerException();
		}
		return new Object() {
			@SuppressWarnings("unused")
			public List<AugRequestDto> getData() {
				return data;
			}
		};
	}
	
	/*-------------------- Search Request By Id--------------------*/
	@RequestMapping(value = "/request/search/{id}", method = { RequestMethod.POST, RequestMethod.GET  })
	public @ResponseBody AugRequestDto searchRequestById(
			@PathVariable Integer id, Model model){
		//AugRequestDTO augRequest = augRequestService.findAugRequestById(500);//test 404 resource not found
		return augRequestService.findAugRequestById(id);
	}

	

	/*-------------------- Save Request--------------------*/
//	@Transactional
	@RequestMapping(value = "/request/save", method = RequestMethod.POST)
	public @ResponseBody AugRequest saveRequest(@RequestBody AugRequest augRequest,HttpSession session,Model model) throws UnsupportedEncodingException{
		
		augRequestService.create(augRequest);
		AugRequest augRe = augRequestService.findById(augRequest.getId());
			
		return augRe;
	}
	
//	@Transactional
	@RequestMapping(value = "/request/sendEmail/{id}", method = RequestMethod.GET)
	public @ResponseBody AugRequestDto sendEmail(@PathVariable Integer id,HttpServletRequest request,HttpSession session,Model model) throws UnsupportedEncodingException{
		AugRequestDto augRe = augRequestService.findAugRequestByIdTest(id);
		
		//find employee
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		System.out.println("userName : " + userDetails.getUsername());
		Login login = loginService.findByUserName(userDetails.getUsername());
		Employee employee = login.getEmployee();
		Applicant sender = employee.getApplicant();
		System.out.println("sender: " + sender.getFirstNameEN());
		MailTemplate content = mailTemplateService.findByName("New Job Case");
		System.out.println("content: " + content);
		String subject = "You have new job case " + augRe.getJobcaseCode();
		System.out.println(subject);
		//create mail
		emailService.sendNewJobCaseMail(sender, subject,augRe, content.getTemplate(), request);
			
		return augRe;
	}

	/*-------------------- Update Request--------------------*/
	@RequestMapping(value = "/request/edit/{id}", method = { RequestMethod.POST, RequestMethod.GET})
	public @ResponseBody AugRequestDto editAugRequest(
			@RequestBody AugRequestDto augRequestDto, @PathVariable Integer id) throws Exception {
		
		MasJobLevel masJoblevel = masJoblevelService.findById(augRequestDto.getJoblevelId());
		MasTechnology masTechnology = masTechnologyService.findById(augRequestDto.getTechnologyId());
		AugRequest augRequest = augRequestService.findById(augRequestDto.getId());
		
		augRequest.setId(augRequestDto.getId());
		augRequest.setJobcaseCode(augRequestDto.getJobcaseCode());
		augRequest.setRequestDate(augRequestDto.getRequestDate());
		augRequest.setStatus(augRequestDto.getStatus());
		augRequest.setJobcaseStatus(augRequestDto.getJobcaseStatus());
		augRequest.setApproveDate(augRequestDto.getApproveDate());
		augRequest.setJoblevel(masJoblevel);
		augRequest.setTechnology(masTechnology);
		augRequest.setNumberApplicant(augRequestDto.getNumberApplicant());
		augRequest.setSpecificSkill(augRequestDto.getSpecificSkill());
		augRequest.setYearExperience(augRequestDto.getYearExperience());

		augRequestService.update(augRequest);
		
		AugRequestDto requestDto = augRequestService.findAugRequestById(id);
		requestDto.setJobLevelStr(masJoblevel.getName());
		requestDto.setTechnologyStr(masTechnology.getName());
		
		return requestDto;

	}

	/*-------------------- Delete Request--------------------*/
	@RequestMapping(value = "/request/delete/{id}", method = RequestMethod.POST)
	public @ResponseBody AugRequest delesteUser(@ModelAttribute AugRequest augRequest,
			@PathVariable("id") Integer id) throws Exception {
		
		augRequestService.delete(augRequest);
		return augRequestService.findById(id);
	}
	
	@ModelAttribute("jobLevels")
//	@Transactional
	public List<MasJobLevel> jobLevelList(){
		return masJoblevelService.findAll();
	}
	
	@ModelAttribute("technologies")
//	@Transactional
	public List<MasTechnology> technologyList(){
		return masTechnologyService.findAll();
	}
	
}
