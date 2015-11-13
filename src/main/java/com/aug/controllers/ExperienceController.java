package com.aug.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.hrdb.dto.ExperienceDto;
import com.aug.hrdb.entities.Experience;
import com.aug.hrdb.services.ApplicantService;
import com.aug.hrdb.services.ExperienceDtoService;
import com.aug.hrdb.services.ExperienceService;



@Controller
public class ExperienceController {
	@Autowired private ExperienceService experienceService;
	@Autowired private ExperienceDtoService experienceDtoService;
	@Autowired private ApplicantService applicantService;
	
	@RequestMapping(value = "/experience/{id}", method =  RequestMethod.GET)
    public String init(HttpSession session,Locale locale,ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute ExperienceDto experienceDto) {		
		
		experienceDto.setApplicantId(id);;
		model.addAttribute("id", experienceDto.getApplicantId());
		return "/HrSystem/experience";
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",Locale.ENGLISH);
        CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, editor);
    }	
	
//	@RequestMapping(value ="/experience/listAll", method = {RequestMethod.GET, RequestMethod.POST})
//	public @ResponseBody List<Experience> listAll(@RequestParam Integer id){
//		Employee emp = new Employee();
//		emp.setId(id);
//		Experience experience = new Experience();
//		Hibernate.initialize(experience.getEmployee());
//		experience.setEmployee(emp);
//		return (List<Experience>) experienceService.findByCriteria(experience);
//	}
	
	@RequestMapping(value ="/experience/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<ExperienceDto> listAll(@PathVariable("id") Integer id){
		
		return (List<ExperienceDto>) experienceDtoService.searchExperience(id);
	}
	
	@RequestMapping(value ="/experience/testAjax/{string}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody String testAjax(@PathVariable String string){
		return "testAjax: "+string;
	}
	
	//Add	
	@RequestMapping(value = "/experience/add", method = RequestMethod.POST )
	public @ResponseBody ExperienceDto Add(@RequestBody ExperienceDto experienceDto) {
//		EmployeeDto employeeDto = new EmployeeDto();
//		employeeDto.setName(experience.getEmployee().getNameEng());
//	Hibernate.initialize(experience.getEmployee().getNameEng());
		Experience experience = new Experience();
		experience = experience.fromExperienceDto(experience, experienceDto);
		experience.setApplicant(applicantService.findById(experienceDto.getApplicantId()));
		experienceService.create(experience);
		return experienceDto;
	}
	
	//InitEdit
//	@Transactional
	@RequestMapping(value = "/experience/initEdit/{expId}", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody ExperienceDto initEditExperience(@PathVariable("expId") Integer expId) {	
		Experience experience = experienceService.findById(expId);
		return experience.toExperienceDto();
	}
	
	//edit
	@Transactional
	@RequestMapping(value = "/experience/edit", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody ExperienceDto editExperience(@RequestBody ExperienceDto experienceDto) {
		Experience experience = experienceService.findById(experienceDto.getId());
		Experience experienceEdit = experience.fromExperienceDto(experience, experienceDto);
		experienceService.update(experienceEdit);
		return experience.toExperienceDto();
	}
	
	//delete
	@RequestMapping(value = "/experience/delete/{expId}", method = { RequestMethod.GET,RequestMethod.POST} )
	public @ResponseBody String deleteExperience(@PathVariable("expId") Integer expId) {
		experienceService.deleteById(expId);
		return "{success:true}";
	}
	
	@ModelAttribute("experience")
	Experience setupForm() {
		return new Experience();
	}
}
