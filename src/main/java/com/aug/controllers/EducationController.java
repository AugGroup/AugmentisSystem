/**
 *
 * @author Preeyaporn
 * @date 28 เม.ย. 2558
 */
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.hrdb.services.EducationDtoService;
import com.aug.hrdb.dto.EducationDto;
import com.aug.hrdb.dto.ReferenceDto;
import com.aug.hrdb.entities.Ability;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.Education;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.MasDegreetype;
import com.aug.hrdb.entities.Reference;
import com.aug.hrdb.services.ApplicantService;
import com.aug.hrdb.services.EducationService;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.MasDegreetypeService;

@Controller
public class EducationController {

	@Autowired
	private EducationService educationService;

	@Autowired 
	private EducationDtoService educationDtoService;
	
	@Autowired
	private MasDegreetypeService masDegreetypeService;
	
	@Autowired
	private EmployeeService employeeService;

	@Autowired
	private ApplicantService applicantService;
	
	
	@Autowired
	private MasDegreetypeService masDegreeTypeService;
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",Locale.ENGLISH);
        CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, editor);
    }	
	
	@RequestMapping(value = "/education/{id}", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String list(ModelMap model, Locale locale,
			@PathVariable("id") Integer id, 
			@ModelAttribute EducationDto educationDto) {
		
		Employee employee = employeeService.findById(id);
		
		model.addAttribute("masdegreetypeList",
				masDegreetypeService.findAll());
		
		educationDto.setApplicant(employee.getApplicant().getId());
		model.addAttribute("id", employee.getId());
		model.addAttribute("appId", employee.getApplicant().getId());
		return "/HrSystem/education";
	}
	
	

	
	
	
	/*@RequestMapping(value = "/education/listAll", method = RequestMethod.POST)
	public @ResponseBody List<Education> listAll(
			@RequestBody Education education) {
		return educationService.findByCriteria(education);
	}*/

	/*@RequestMapping(value ="/education/listAll", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<Education> listAll(){
		Education education = new Education();
		education.setMajor("");
		return educationService.findByCriteria(education);
	}*/
	
	
	@RequestMapping(value ="/education/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<EducationDto> listAll(@PathVariable("id") Integer id){
		
		return (List<EducationDto>) educationDtoService.searchEducation(id);
	}
	
	
	@RequestMapping(value = "/education/add", method = RequestMethod.POST)
	public @ResponseBody EducationDto addEducation(@RequestBody EducationDto educationDto) {
		Education education = new Education();
		Applicant applicant=applicantService.findById(educationDto.getApplicantId());
		MasDegreetype masDegreeType = masDegreeTypeService.find(educationDto.getMasdegreetypeId());
		
		education.setApplicant(applicant);
		
		education.setStart_date(educationDto.getStart_date());
		education.setGraduated_date(educationDto.getGraduated_date());
		education.setUniversity(educationDto.getUniversity());
		education.setMajor(educationDto.getMajor());
		education.setFaculty(educationDto.getFaculty());
		education.setMasdegreetype(masDegreeType);
		education.setGpa(educationDto.getGpa());
		education.setCertification(educationDto.getCertification());
		educationService.create(education);
		
		
		return educationDto;
	}

	@Transactional
	@RequestMapping(value = "/education/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody EducationDto updateEducation(@RequestBody EducationDto educationDto) {
		
		Education education = educationService.findById(educationDto.getId());
		Applicant applicant=applicantService.findById(educationDto.getApplicantId());
		MasDegreetype masDegreeType = masDegreeTypeService.find(educationDto.getMasdegreetypeId());
		
		education.setApplicant(applicant);
		
		education.setStart_date(educationDto.getStart_date());
		education.setGraduated_date(educationDto.getGraduated_date());
		education.setUniversity(educationDto.getUniversity());
		education.setMajor(educationDto.getMajor());
		education.setFaculty(educationDto.getFaculty());
		education.setMasdegreetype(masDegreeType);
		education.setGpa(educationDto.getGpa());
		education.setCertification(educationDto.getCertification());
		educationService.update(education);
		
		
		return educationDto;
		
		/*Education entityLOaded=educationService.findById(educationDto.getId());
		Education education = new Education();
		educationService.update(education.fromEducationDto(entityLOaded, educationDto));*/
		
		
		
		/*entityLOaded.setStart_date(educationDto.getStart_date());
		entityLOaded.setGraduated_date(educationDto.getGraduated_date());
		entityLOaded.setUniversity(educationDto.getUniversity());
		entityLOaded.setMajor(educationDto.getMajor());
		entityLOaded.setFaculty(educationDto.getFaculty());
		entityLOaded
		entityLOaded.setMasdegreetype(educationDto.getDegreeType());
		entityLOaded.setGpa(educationDto.getGpa());
		entityLOaded.setCertification(educationDto.getCertification());*/
		
		
		/*educationService.update(entityLOaded);
		return educationDto;*/
		
		/*Education education = educationService.findById(educationDto.getId());
		Education educationUpdate = education.fromEducationDto(education, educationDto);
		educationService.update(educationUpdate);
		return education.toEducationDto();*/
	}
	
	
	
	
	
	@RequestMapping(value = "/education/findById/{educationid}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody EducationDto findById(@PathVariable("educationid")  Integer educationid) {
		Education education = educationService.findById(educationid);
		return education.toEducationDto();
	}
	
	
	
	
	
	
	
	/*
	@RequestMapping(value = "/education/findById/{educationid}", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody Education findById(@PathVariable("educationid") Integer educationid) {	
		return educationService.findById(educationid);
	}*/
		
	@RequestMapping(value = "/education/delete/{educationid}", method = RequestMethod.POST)
	public @ResponseBody String deleteEducation(@PathVariable Integer educationid) {
		educationService.deleteById(educationid);
		return "{success:true}";
	}

	@ModelAttribute("education")
	Education setupForm() {
		return new Education();
	}
}
