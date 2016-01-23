package com.aug.controllers;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

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

import com.aug.hrdb.dto.PunishDto;
import com.aug.hrdb.entities.Punish;
import com.aug.hrdb.services.PunishDtoService;
import com.aug.hrdb.services.PunishService;




@Controller
public class PunishController {
	@Autowired 
	private PunishService punishService;
	@Autowired
	private PunishDtoService punishDtoService;
	
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",Locale.ENGLISH); // dd/MM/yyyy
		CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
		binder.registerCustomEditor(Date.class, editor);		
	}
	 

	@RequestMapping(value = "/punish/{id}", method = {RequestMethod.GET,RequestMethod.POST})
    public String list(HttpSession session,Locale locale, ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute PunishDto punishDto) {
		
		punishDto.setEmployeeId(id);
		model.addAttribute("id", punishDto.getEmployeeId());
		return "/HrSystem/punish";
	}
	
	
//	@RequestMapping(value = "/punish/listAll", method = {RequestMethod.GET, RequestMethod.POST})
//	public @ResponseBody List<Punish> listAll() {
//		Punish punish = new Punish();
//		punish.setReason("");
//		return punishService.findByCriteria(punish);
//	}
	
	
	@RequestMapping(value = "/punish/listAll{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<PunishDto> listAll(@PathVariable("id") Integer id) {
		return (List<PunishDto>) punishDtoService.searchPunish(id);
	}
	
	
	@RequestMapping(value = "/punish/add", method = RequestMethod.POST)
	public @ResponseBody PunishDto addPunsih(@RequestBody PunishDto punishDto) {
		Punish punish = new Punish();
		punishService.create(punish.fromPunishDto(punish,punishDto));
		return punishDto;
	}
	
	@RequestMapping(value = "/punish/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody PunishDto updatePunish(@RequestBody PunishDto punishDto ) {
		
		Punish entityLoaded = punishService.findById(punishDto.getId());
		entityLoaded.setDatePunish(punishDto.getDatePunish());
		entityLoaded.setDescription(punishDto.getDescription());	
		entityLoaded.setPenalty(punishDto.getPenalty());
		
		punishService.update(entityLoaded);
		return punishDto;
	}
	
	@RequestMapping(value = "/punish/findById/{punishid}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody PunishDto findById(@PathVariable("punishid") Integer punishid) {
		Punish punish = punishService.findById(punishid);
		return punish.toPunishDto();
	}
	
	@RequestMapping(value = "/punish/delete/{punishid}", method = RequestMethod.POST)
	public @ResponseBody String deletePunish(@PathVariable("punishid")Integer punishid) {
		punishService.deleteById(punishid);		
		//return "{success:true}";
		return "redirect:/punish";
	}
	@ModelAttribute("punish")
	Punish setupForm() {
		return new Punish();
	}
	

}
