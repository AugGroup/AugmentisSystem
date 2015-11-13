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
import com.aug.hrdb.entities.Address;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Reward;
import com.aug.hrdb.dto.RewardDto;
import com.aug.entity.editor.RewardEditor;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.RewardService;
import com.aug.hrdb.services.RewardDtoService;


@Controller
public class RewardController {
	
	@Autowired RewardService rewardService;
	@Autowired RewardEditor RewardEditor;
	@Autowired EmployeeService employeeService;
	@Autowired RewardDtoService rewardDtoService;
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",Locale.ENGLISH);
        CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, editor);
        binder.registerCustomEditor(Address.class, RewardEditor);
    }	
	

	@RequestMapping(value = "/reward/{id}", method = {RequestMethod.GET,RequestMethod.POST})
    public String list(HttpSession session,Locale locale, ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute RewardDto rewardDto) {
		
		rewardDto.setEmployeeId(id);
		model.addAttribute("id", rewardDto.getEmployeeId());
		return "/HrSystem/reward";
	}
	
	
//	
//	@RequestMapping(value = "/reward/listAll", method = {RequestMethod.GET, RequestMethod.POST})
//	public @ResponseBody List<Reward> listAll() {
//		Reward reward = new Reward();
//		reward.setName("");
//		return rewardService.findByCriteria(reward);
//	}
	
	
	@RequestMapping(value = "/reward/listAll{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<RewardDto> listAll(@PathVariable("id") Integer id) {
		return (List<RewardDto>) rewardDtoService.searchReward(id);
	}
	
	
	@RequestMapping(value = "/reward/add", method = RequestMethod.POST)
	public @ResponseBody RewardDto addReward(@RequestBody RewardDto rewardDto) {
		Reward reward = new Reward();	
		rewardService.create(reward.fromRewardDto(reward, rewardDto));			
		return rewardDto;
	}
	
	@Transactional
	@RequestMapping(value = "/reward/update", method = RequestMethod.POST)
	public @ResponseBody RewardDto updateReward(@RequestBody RewardDto rewardDto ) {
			
		Reward entityLoaded = rewardService.findById(rewardDto.getId());	
		//entityLoaded.setId(rewardDto.getId());
		entityLoaded.setTypereward(rewardDto.getTypereward());	
		entityLoaded.setYear(rewardDto.getYear());	
		entityLoaded.setReason(rewardDto.getReason());
		entityLoaded.setIsActive(rewardDto.getIsActive());
		
		rewardService.update(entityLoaded);
		return rewardDto;
	}

	@RequestMapping(value = "/reward/findById/{rewardid}", method = {RequestMethod.GET,RequestMethod.POST})
	public @ResponseBody RewardDto findById(@PathVariable("rewardid") Integer rewardid) {
		Reward reward = rewardService.findById(rewardid);
		return reward.toRewardDto();
	}
	
	@RequestMapping(value = "/reward/delete/{rewardid}", method = RequestMethod.POST)
	public @ResponseBody String deleteReward(@PathVariable("rewardid") Integer rewardid) {
		rewardService.deleteById(rewardid);
		return "redirect:/reward";
	}
	
	
	@ModelAttribute("reward")
	Reward setupForm() {
		return new Reward();
	}
	
}
