package com.aug.controllers;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.exception.CustomException;
import com.aug.entity.editor.FamilyEditor;
//import com.aug.hr.entity.validator.FamilyValidator;
import com.aug.hrdb.dto.FamilyDto;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Family;
import com.aug.hrdb.entities.MasRelationType;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.FamilyDtoService;
import com.aug.hrdb.services.FamilyService;
import com.aug.hrdb.services.MasRelationTypeService;





@Controller
public class FamilyController {
	
	private final static Logger logger = Logger
			.getLogger(Family.class);
	
	@Autowired
	private FamilyService familyService;
	@Autowired
	private FamilyEditor familyEditor;
	//@Autowired
	//private FamilyValidator familyValidator;
	@Autowired
	private FamilyDtoService familyDtoService;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private MasRelationTypeService masRelationService;

	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",
				Locale.ENGLISH); // dd/MM/yyyy
		CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
		binder.registerCustomEditor(Date.class, editor);
		binder.registerCustomEditor(Family.class, familyEditor);		
	}
	
	
	
	@RequestMapping(value = "/family/{id}", method = RequestMethod.GET)
	public String initEmpFamily(Locale locale,
			@ModelAttribute(value = "family") Family family,
			ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute FamilyDto familyDto){
		
		//init page for display page 
		
		logger.info("Welcome to employee family(list) locale: " + locale);
		
		Employee employee = employeeService.findById(id);
		
		List<MasRelationType> masRelationTypeList = masRelationService.findAll();
		model.addAttribute("family", family);
		model.addAttribute("masRelationTypeList", masRelationTypeList);
		model.addAttribute("appId", employee.getApplicant().getId());
		familyDto.setEmployeeId(id);
		model.addAttribute("id", familyDto.getEmployeeId());
	
		return "/HrSystem/familychange";

	}
	
	

	@RequestMapping(value = "/family/list/{id}", method = RequestMethod.POST,produces="application/json")
	public @ResponseBody List<FamilyDto> findEmpFamily(Locale locale,
		    //@ModelAttribute(value = "family") Family family,
			ModelMap model,
			@PathVariable("id") Integer id) {
			
		List<FamilyDto> familyDtoTest = familyDtoService.listFamily(new Integer(id));
		return familyDtoTest;
		
		
	}
	
	
	

	@RequestMapping(value = "/family/add", method =  RequestMethod.POST)
	public @ResponseBody FamilyDto Add(Locale locale,
			    @RequestBody FamilyDto familyDto) throws CustomException{

		        logger.info("create");
		        
			       
		        
	            if(familyDto.getFamilyName().isEmpty()||familyDto.getGender().isEmpty()||
	            		familyDto.getAge()==null||familyDto.getMobile().isEmpty()||familyDto.getAddress().isEmpty()||
	            		familyDto.getMasRelationTypeId()==null){
	            	
	            		throw new CustomException("Business Error", "It have some or Any field is required!");
	            	
	            }else{
	            	
	            
	            	if(familyDto.getMobile().length()!=12){
	    
	            		throw new CustomException("Business Error", "length of mobile is not equal 12!");
	            	
	            	
	            	}else if(familyDto.getMobile().length()==12){
	            		
	            		if(familyDto.getMobile().matches("^[0-9]{3}-[0-9]{3}-[0-9]{4}")){
	    	            	familyService.createFindMasRelationAndEmployee(familyDto);	
	            		}else{
	            			throw new CustomException("Business Error", "format of mobile is incorrect!");
	            		}

	            		
	            	}
	            }
	            	
	            
		        return familyDto;
		
		
	}
	
	
	
	@RequestMapping(value = "/family/initedit", method = RequestMethod.POST)
	public @ResponseBody FamilyDto initEdit(Locale locale,
							@RequestBody FamilyDto family,
							ModelMap modal){
		
	    logger.info("init edit");
		return familyService.findFamily(family.getId());
		
	}
	
	
	

	
	
	@RequestMapping(value = "/family/edit", method = RequestMethod.POST)
	public @ResponseBody FamilyDto Edit(Locale locale,
							@RequestBody FamilyDto familyDto,
							ModelMap modal) {
		
	    logger.info("edit");
	    
	    if(familyDto.getFamilyName().isEmpty()||familyDto.getGender().isEmpty()||
        		familyDto.getAge()==null||familyDto.getMobile().isEmpty()||familyDto.getAddress().isEmpty()||
        		familyDto.getMasRelationTypeId()==null){
        	
        		throw new CustomException("Business Error", "It have some or Any field is required!");
        	
        }else{
        	
        
        	if(familyDto.getMobile().length()!=12){

        		throw new CustomException("Business Error", "length of mobile is not equal 12!");
        	
        	
        	}else if(familyDto.getMobile().length()==12){
        		
        		if(familyDto.getMobile().matches("^[0-9]{3}-[0-9]{3}-[0-9]{4}")){
        	        familyService.updateFindMasRelationAndEmployee(familyDto);	
        		}else{
        			throw new CustomException("Business Error", "format of mobile is incorrect!");
        		}

        		
        	}
        }
        	
	    return familyDto;
	}
	
	
	
	
	
	@RequestMapping(value = "/family/delete", method = RequestMethod.POST)
	public @ResponseBody FamilyDto Delete(Locale locale,
							@RequestBody FamilyDto familyDtoTest,
							ModelMap modal){
		
	    logger.info("delete");	 
	    familyService.deleteById(familyDtoTest.getId());
		return familyDtoTest;		
	}	

	
}
