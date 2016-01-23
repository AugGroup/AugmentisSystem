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

import com.aug.hrdb.dto.AllowanceDto;
import com.aug.hrdb.entities.Allowance;
import com.aug.hrdb.entities.MasAllowance;
import com.aug.hrdb.services.AllowanceDtoService;
import com.aug.hrdb.services.AllowanceService;
import com.aug.hrdb.services.MasAllowanceService;

@Controller
public class AllowanceController {

	@Autowired
	private AllowanceService allowancesService;
	
	@Autowired
	private AllowanceDtoService AllowanceDtoService;
	
	@Autowired
	private MasAllowanceService masAllowancesService;
	
	@RequestMapping(value = "/allowances/{id}", method = { RequestMethod.GET,
			RequestMethod.POST })
	public String init(ModelMap model,
			@PathVariable("id") Integer id,
			@ModelAttribute AllowanceDto AllowanceDto) {
		model.addAttribute("masallowancesList",
				masAllowancesService.findAll());
		
		AllowanceDto.setEmployeeId(id);
		model.addAttribute("id", AllowanceDto.getEmployeeId());
		
		return "/HrSystem/allowances";
	}
	
	@RequestMapping(value ="/allowances/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<AllowanceDto> listAll(@PathVariable("id") Integer id){
		
		return (List<AllowanceDto>) AllowanceDtoService.searchAllowances(id);
	}
	
	
	@RequestMapping(value = "/allowances/add", method = RequestMethod.POST)
	public @ResponseBody AllowanceDto addAllowances(@RequestBody AllowanceDto AllowanceDto) {
		Allowance allowances = new Allowance();
		allowancesService.create(allowances.fromAllowanceDto(allowances, AllowanceDto));
		return AllowanceDto;
	}

	@RequestMapping(value = "/allowances/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AllowanceDto updateAllowances(@RequestBody AllowanceDto AllowanceDto) {
		Allowance allowances = allowancesService.findById(AllowanceDto.getId());
		Allowance allowancesUpdate = allowances.fromAllowanceDto(allowances, AllowanceDto);
		allowancesService.update(allowancesUpdate);
		return allowances.toAllowanceDto();
	}
	
	@RequestMapping(value = "/allowances/findById", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody AllowanceDto findById(@RequestParam Integer allowancesid) {
		Allowance allowances = allowancesService.findById(allowancesid);
		return allowances.toAllowanceDto();
	}
	
	@RequestMapping(value = "/allowances/delete", method = RequestMethod.POST)
	public @ResponseBody String deleteAllowances(@RequestParam Integer allowancesid) {
		allowancesService.deleteById(allowancesid);
		return "{success:true}";
	}

	@RequestMapping(value = "/allowances/findByIdMas", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody MasAllowance findByIdMas(@RequestParam Integer masAllowancesid) {
		MasAllowance masAllowances = masAllowancesService.find(masAllowancesid);
		return masAllowances;
	}
	
	@ModelAttribute("allowances")
	Allowance setupForm() {
		return new Allowance();
	}
}
