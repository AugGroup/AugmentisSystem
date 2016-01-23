package com.aug.controllers;



import java.util.List;
import java.util.Locale;



import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.exception.CustomException;
import com.aug.hrdb.services.HealthDtoService;
import com.aug.hrdb.entities.Health;
import com.aug.hrdb.entities.Language;
import com.aug.hrdb.dto.HealthDto;
import com.aug.hrdb.services.HealthService;

@Controller
public class HealthController {
	
	
	private final static Logger logger = Logger
			.getLogger(Language.class);
	
	@Autowired 
	private HealthService healthService;
	@Autowired
	private HealthDtoService healthDtoService;
	
	
	@RequestMapping(value = "/health/{id}", method = RequestMethod.GET)
	public String initSkillLanguage(Locale locale,
			//@ModelAttribute(value = "health") Health health,
			ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute(value = "healthDto") HealthDto healthDto,
			HttpServletRequest request) {
		
		
		logger.info("Welcome to health locale: " + locale);
		//model.addAttribute("health", health);

		healthDto.setEmployeeId(id);
		model.addAttribute("id", healthDto.getEmployeeId());
		healthDto =  healthService.findByEmployeeId(id);
		model.addAttribute("healthDto",healthDto);
		
		
		return "/HrSystem/health";
	}
	
	
	@RequestMapping(value = "/health/list/{id}", method = RequestMethod.POST)
	public @ResponseBody List<HealthDto> findData(Locale locale,
			@PathVariable("id") Integer id,
			ModelMap model) {
		
		    List<HealthDto> healthDto =  healthDtoService.listHealth(new Integer(id));		    
		    return healthDto;
		   
	}
	
	
	@RequestMapping(value = "/health/add", method = RequestMethod.POST)
	public @ResponseBody HealthDto add(Locale locale,
				@RequestBody HealthDto healthDto,
				ModelMap model,
				HttpServletRequest request) throws CustomException{
		
			List<HealthDto> healthDtoForCheck =  healthDtoService.listHealth(healthDto.getEmployeeId());
			System.err.println("size: "+healthDtoForCheck.size());
			if(healthDtoForCheck.size()>=1){
				throw new CustomException("Business Error", "Can't create more than one record!");
			}
		
		   
			Health health = healthService.createSetDtoToEntity(healthDto);	
			if(health.getId()!=null){
				System.out.println("idhealth: "+health.getId());
				healthDto = healthService.findByIdReturnToDto(health.getId());
			}
			
			
			return healthDto;
		   
	}
	
	

	@RequestMapping(value = "/health/initedit", method = RequestMethod.POST)
	public @ResponseBody HealthDto initEdit(Locale locale,
				@RequestBody HealthDto healthDto,
				ModelMap model){
		
		HealthDto  healthDtoToPage =  healthService.findByIdReturnToDto(healthDto.getId());
		return healthDtoToPage;
		   
	}
	
	
	@RequestMapping(value = "/health/edit", method = RequestMethod.POST)
	public @ResponseBody HealthDto edit(Locale locale,
				@RequestBody HealthDto healthDto,
				ModelMap model) {
		
		healthService.updateSetDtoToEntity(healthDto);
		return healthDto;
		   
	}
	
	
	
	@RequestMapping(value = "/health/delete", method = RequestMethod.POST)
	public @ResponseBody String delete(Locale locale,
				@RequestBody HealthDto healthDto,
				ModelMap model){
		
		Health health = healthService.find(healthDto.getId());
		healthService.delete(health);
		String success = "successs";
		return success;
		   
	}

}
