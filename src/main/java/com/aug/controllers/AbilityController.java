/**
 *
 * @author Pranrajit
 * @date 1 พ.ค. 2558
 */
package com.aug.controllers;


import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.hrdb.services.AbilityDtoService;
import com.aug.hrdb.entities.Ability;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.Certification;
import com.aug.hrdb.entities.MasSpecialty;
import com.aug.hrdb.dto.AbilityDto;
import com.aug.hrdb.services.AbilityService;
import com.aug.hrdb.services.ApplicantService;
import com.aug.hrdb.services.MasSpecialtyService;


@Controller
public class AbilityController {

	@Autowired private AbilityService abilityService;
	
	@Autowired private AbilityDtoService abilityDtoService;
	
	@Autowired private MasSpecialtyService masSpecialtyService;
	
	@Autowired private ApplicantService applicantService;
	
	
	//@Autowired private UploadService uploadService;

	/*@RequestMapping(value = "/ability", method =RequestMethod.GET)
    public String init(ModelMap model) {	
		model.addAttribute("masspecialtyList",
				masSpecialtyService.findAll());
		return "ability/ability";
	}*/
	
	
	
	@RequestMapping(value="/ability/{id}",method={RequestMethod.GET,
			RequestMethod.POST})
	public String listAbility(HttpSession session,Locale locale, ModelMap model,@PathVariable("id") Integer id,
			@ModelAttribute AbilityDto abilityDto){
		model.addAttribute("masspecialtyList",
				masSpecialtyService.findAll());
		
		abilityDto.setApplicantId(id);
		model.addAttribute("id", abilityDto.getApplicantId());
		return "/HrSystem/ability";
	}
	
	
	@RequestMapping(value ="/ability/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<AbilityDto> listAll(@PathVariable("id") Integer id){
		
		return (List<AbilityDto>) abilityDtoService.searchAbility(id);
	}
	
	
	/*@RequestMapping(value ="/ability/listAll", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<Ability> listAll(){
		
		return abilityService.findAll();
	}*/
	
	@RequestMapping(value="/ability/add",method=RequestMethod.POST)
	public @ResponseBody AbilityDto addAbility(@RequestBody AbilityDto abilityDto){

		Ability ability = new Ability();
		Applicant applicant=applicantService.findById(abilityDto.getApplicantId());
		MasSpecialty masSpecialty=masSpecialtyService.findById(abilityDto.getMasspecialtyId());
		
		ability.setApplicant(applicant);
		ability.setRank(abilityDto.getRank());
		ability.setMasspecialty(masSpecialty);
		
		abilityService.create(ability);
		//abilityService.create(ability.fromAbilityDto(abilityDto, ability));
		return abilityDto;
		
	}
	
	
	/*@RequestMapping(value="/ability/findById",method=RequestMethod.POST)
	public @ResponseBody Ability findById(@RequestParam Integer id)
	{
		return abilityService.find(id);
	}
	*/
	
	
	@RequestMapping(value="/ability/findById/{abilityid}",method={ RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AbilityDto findById(@PathVariable("abilityid") Integer abilityid){
		
		Ability ability = abilityService.find(abilityid);
		return ability.toAbilityDto();
	}
	
	
	/*@Transactional
	@RequestMapping(value="/ability/update",method=RequestMethod.POST)
	public @ResponseBody AbilityDto ubdateAbility(@RequestBody AbilityDto abilityDto){
		Ability ability = new Ability();
			abilityService.update(ability.fromAbilityDto(abilityDto));
			return abilityDto;
	}
	*/
	
	@RequestMapping(value = "/ability/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AbilityDto updateAbility(@RequestBody  AbilityDto abilityDto) {
		
		Ability ability = abilityService.find(abilityDto.getId());
		
		Applicant applicant=applicantService.findById(abilityDto.getApplicantId());
		MasSpecialty masSpecialty=masSpecialtyService.findById(abilityDto.getMasspecialtyId());
		
		ability.setApplicant(applicant);
		ability.setRank(abilityDto.getRank());
		ability.setMasspecialty(masSpecialty);
		
		abilityService.update(ability);
		
		/*Ability ability  = abilityService.find(abilityDto.getId());
		Ability abilityUpdate = ability.fromAbilityDto(abilityDto, ability);
		abilityService.update(abilityUpdate);*/
		
		
		
		return ability.toAbilityDto();
	}
	
	
	
	
	@RequestMapping(value="/ability/delete/{abilityid}",method=RequestMethod.POST)
	public @ResponseBody String deleteById(@PathVariable("abilityid") Integer abilityid){
		abilityService.deleteById(abilityid);
		return "redirect:/ability";
	
	
	}
	
	@ModelAttribute("ability")
	Ability setupForm(){
		return new Ability();
	}
}
