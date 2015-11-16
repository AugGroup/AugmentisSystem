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

import com.aug.hrdb.services.CardDtoService;
import com.aug.hrdb.entities.Card;
import com.aug.hrdb.dto.CardDto;
import com.aug.hrdb.services.CardService;

@Controller
public class CardController {
	@Autowired
	private CardService cardService;
	@Autowired
	private CardDtoService cardDtoService;
	
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",Locale.ENGLISH); // dd/MM/yyyy
		CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
		binder.registerCustomEditor(Date.class, editor);		
	}
	
	@RequestMapping(value = "/card/{id}", method = {RequestMethod.GET,RequestMethod.POST})
    public String list(HttpSession session,Locale locale, ModelMap model,
    		@PathVariable("id") Integer id, 
			@ModelAttribute CardDto cardDto) {
		
		cardDto.setEmployeeId(id);
		model.addAttribute("id", cardDto.getEmployeeId());
		return "/HrSystem/card";
	}
	
	@RequestMapping(value = "/card/listAll{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<CardDto> listAll(@PathVariable("id") Integer id) {
		return (List<CardDto>) cardDtoService.searchCard(id);
	}
	
	@RequestMapping(value = "/card/add", method = RequestMethod.POST)
	public @ResponseBody CardDto addCard(@RequestBody CardDto cardDto) {
		Card card = new Card();
		cardService.create(card.fromCardDto(card, cardDto));
		return cardDto;
	}
	
	@RequestMapping(value = "/card/update", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody CardDto updateCard(@RequestBody CardDto cardDto ) {
		
		Card entityLoaded = cardService.findById(cardDto.getId());
		entityLoaded.setCard_no(cardDto.getCard_no());
		entityLoaded.setStartdate(cardDto.getStartdate());
		entityLoaded.setEnddate(cardDto.getEnddate());
		entityLoaded.setStatus(cardDto.getStatus());
		entityLoaded.setRemark(cardDto.getRemark());
			
		cardService.update(entityLoaded);
		return cardDto;
	}
	
	
	@RequestMapping(value = "/card/findById/{cardid}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody CardDto findById(@PathVariable("cardid") Integer cardid) {
		Card card = cardService.findById(cardid);
		return card.toCardDto();
	}
	
	
	@RequestMapping(value = "/card/delete/{cardid}", method = RequestMethod.POST)
	public @ResponseBody String deleteCard(@PathVariable("cardid")Integer cardid) {
		cardService.deleteById(cardid);		
		//return "{success:true}";
		return "redirect:/card";
	}
	@ModelAttribute("card")
	Card setupForm() {
		return new Card();
	}
	
	
	

}
