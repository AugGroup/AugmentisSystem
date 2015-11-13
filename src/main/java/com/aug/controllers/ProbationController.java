package com.aug.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Locale;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.hateoas.ExposesResourceFor;
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

import com.aug.hrdb.dto.ProbationDto;
import com.aug.hrdb.entities.Probation;
import com.aug.hrdb.services.ProbationDtoService;
import com.aug.hrdb.services.ProbationService;


@Controller
@ExposesResourceFor(Probation.class)
public class ProbationController {

    private static Logger logger = LoggerFactory.getLogger(ProbationController.class);

    @Autowired private ProbationService probationService;

	@Autowired private ProbationDtoService probationDtoService;
	
//	@RequestMapping(method = RequestMethod.GET)
//	public ModelAndView getPages() throws Exception {
//		throw new GenericException("404", "Sorry, an error has occured, Requested page not found!");
//	}
// 
//	@ExceptionHandler(GenericException.class)
//	public ModelAndView handleCustomException(GenericException ex) {
// 
//		ModelAndView model = new ModelAndView("error");
//		model.addObject("exception", ex);
//		return model;
// 
//	}
	
	@RequestMapping(value = "/probation/{id}", method =  RequestMethod.GET)
    public String init(HttpSession session,Locale locale,ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute ProbationDto probationDto) {
		
		probationDto.setEmployeeId(id);
		model.addAttribute("id", probationDto.getEmployeeId());
		
		return "/HrSystem/probation";
	}
	
	@InitBinder
	public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd-MM-yyyy",Locale.ENGLISH);
        CustomDateEditor editor = new CustomDateEditor(dateFormat, true);
        binder.registerCustomEditor(Date.class, editor);
    }	
	
//	@RequestMapping(value ="/probation/listAll", method = {RequestMethod.GET, RequestMethod.POST})
//	public @ResponseBody List<Probation> listAll(){
//		return (List<Probation>) probationService.findAll();
//	}
	
	@RequestMapping(value ="/probation/listAll/{id}", method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody List<ProbationDto> listAll(@PathVariable("id") Integer id){
		
		return (List<ProbationDto>) probationDtoService.searchProbation(id);
	}
	
	@RequestMapping(value = "/probation/test", consumes = "application/json" ,method = {RequestMethod.GET, RequestMethod.POST})
	public @ResponseBody Probation test(@RequestBody Probation probation) {
		
		
		return new Probation();
	}
	
	//Add	
	@RequestMapping(value = "/probation/add", method = RequestMethod.POST )
	public @ResponseBody ProbationDto Add(@RequestBody ProbationDto probationDto) {
//		EmployeeDto employeeDto = new EmployeeDto();
//		employeeDto.setName(probation.getEmployee().getNameEng());
//		probationDtoService.createProbation(probationDto);
		Probation probation = new Probation();
		probationService.create(probation.fromProbationDto(probation, probationDto));
		return probationDto;
	}

	//InitEdit
	@RequestMapping(value = "/probation/initEdit/{proId}", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody ProbationDto initEditProbation(@PathVariable("proId") Integer proId) {
        Probation probation = probationService.find(proId);
        //logger.debug("probation result : "+ probation);
        return probation.toProbationDto();
	}
	
	//edit
	@RequestMapping(value = "/probation/edit", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody ProbationDto editProbation(@RequestBody ProbationDto probationDto) {
		Probation probation = probationService.find(probationDto.getId());
		Probation probationEdit = probation.fromProbationDto(probation,probationDto);
		//ProbationDto probationDtoEdit = probation.toProbationDto();
		probationService.update(probationEdit);
		return probation.toProbationDto();
	}
	
	//delete
	@RequestMapping(value = "/probation/delete/{proId}", method = RequestMethod.POST )
	public @ResponseBody String deleteProbation(@PathVariable("proId") Integer proId) {
		probationService.deleteById(proId);
		return "{success:true}";
	}
	
	@ModelAttribute("probation")
	Probation setupForm() {
		return new Probation();
	}
}
