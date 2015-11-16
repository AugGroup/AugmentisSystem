/**
 *
 * @author Preeyaporn
 * @date 4 มิ.ย. 2558
 */
package com.aug.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.hrdb.services.AllowancesDtoService;
import com.aug.hrdb.entities.Allowances;
import com.aug.hrdb.entities.MasAllowances;
import com.aug.hrdb.dto.AllowancesDto;
import com.aug.hrdb.services.AllowancesService;
import com.aug.hrdb.services.MasAllowancesService;

@Controller
public class AllowancesController {

	@Autowired
	private AllowancesService allowancesService;
	
	@Autowired
	private AllowancesDtoService allowancesDtoService;
	
	@Autowired
	private MasAllowancesService masAllowancesService;
	
	@RequestMapping(value = "/allowances/{id}", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String init(ModelMap model,
			@PathVariable("id") Integer id,
			@ModelAttribute AllowancesDto allowancesDto) {
		model.addAttribute("masallowancesList",
				masAllowancesService.findAll());
		
		allowancesDto.setEmployeeId(id);
		model.addAttribute("id", allowancesDto.getEmployeeId());
		
		return "/HrSystem/allowances";
	}
	
	@RequestMapping(value ="/allowances/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<AllowancesDto> listAll(@PathVariable("id") Integer id){
		
		return (List<AllowancesDto>) allowancesDtoService.searchAllowances(id);
	}
	
	
	@RequestMapping(value = "/allowances/add", method = RequestMethod.POST)
	public @ResponseBody AllowancesDto addAllowances(@RequestBody AllowancesDto allowancesDto) {
		Allowances allowances = new Allowances();
		allowancesService.create(allowances.fromAllowancesDto(allowances, allowancesDto));
		return allowancesDto;
	}

	@RequestMapping(value = "/allowances/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AllowancesDto updateAllowances(@RequestBody AllowancesDto allowancesDto) {
		Allowances allowances = allowancesService.findById(allowancesDto.getId());
		Allowances allowancesUpdate = allowances.fromAllowancesDto(allowances, allowancesDto);
		allowancesService.update(allowancesUpdate);
		return allowances.toAllowancesDto();
	}
	
	@RequestMapping(value = "/allowances/findById", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AllowancesDto findById(@RequestParam Integer allowancesid) {
		Allowances allowances = allowancesService.findById(allowancesid);
		return allowances.toAllowancesDto();
	}
	
	@RequestMapping(value = "/allowances/delete", method = RequestMethod.POST)
	public @ResponseBody String deleteAllowances(@RequestParam Integer allowancesid) {
		allowancesService.deleteById(allowancesid);
		return "{success:true}";
	}

	@RequestMapping(value = "/allowances/findByIdMas", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody MasAllowances findByIdMas(@RequestParam Integer masAllowancesid) {
		MasAllowances masAllowances = masAllowancesService.find(masAllowancesid);
		return masAllowances;
	}
	
	@ModelAttribute("allowances")
	Allowances setupForm() {
		return new Allowances();
	}
}
