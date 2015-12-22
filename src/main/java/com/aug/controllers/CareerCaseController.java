package com.aug.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.aug.hrdb.entities.Client;
import com.aug.hrdb.entities.MasCareerCaseStatus;
import com.aug.hrdb.entities.MasCoreSkill;
import com.aug.hrdb.entities.MasDivision;
import com.aug.hrdb.entities.MasJobLevel;
import com.aug.hrdb.entities.MasSpecialty;
import com.aug.hrdb.entities.MasTechnology;
import com.aug.hrdb.services.CareerCaseService;
import com.aug.hrdb.services.ClientService;
import com.aug.hrdb.services.MasCareerCaseStatusService;
import com.aug.hrdb.services.MasCoreSkillService;
import com.aug.hrdb.services.MasDivisionService;
import com.aug.hrdb.services.MasJobLevelService;
import com.aug.hrdb.services.MasSpecialtyService;
import com.aug.hrdb.services.MasTechnologyService;

@Controller
public class CareerCaseController {
	
	private Logger LOGGER = LoggerFactory.getLogger(CareerCaseController.class);
	
	@Autowired
	private CareerCaseService careerCaseService;
	
	@Autowired
	private MasCareerCaseStatusService masCareerCaseStatusService;
	
	@Autowired
	private MasCoreSkillService masCoreSkillService;
	
	@Autowired 
	private MasDivisionService masDivisionService;
	
	@Autowired
	private MasJobLevelService masJobLevelService;
	
	@Autowired
	private MasTechnologyService masTechnologyService;
	
	@Autowired
	private MasSpecialtyService masSpecialtyService;
	
	@Autowired
	private ClientService clientService;
	
	@ModelAttribute(value="careerCaseStatuses")
	private List<MasCareerCaseStatus> findAllMasCareerCaseStatuse() {
		return masCareerCaseStatusService.findAll();
	}
	
	@ModelAttribute(value="coreSkills")
	private List<MasCoreSkill> findAllMasCoreSkill() {
		return masCoreSkillService.findAll();
	}
	
	@ModelAttribute(value="divisions")
	private List<MasDivision> findAllMasDivision() {
		return masDivisionService.findAll();
	}
	
	@ModelAttribute(value="jobLevels")
	private List<MasJobLevel> findAllMasJobLevel() {
		return masJobLevelService.findAll();
	}
	
	@ModelAttribute(value="technologies")
	private List<MasTechnology> findAllMasTechnology() {
		return masTechnologyService.findAll();
	}
	
	@ModelAttribute(value="specialties")
	private List<MasSpecialty> findAllMasSpecialty() {
		return masSpecialtyService.findAll();
	}
	
	@ModelAttribute(value="clients")
	private List<Client> findAllClient() {
		return clientService.findAll();
	}
	
	@RequestMapping(value="careercase", method={RequestMethod.GET})
	public String careerCase() {
		LOGGER.debug("Mapping: /careercase");
		return "career-case";
	}
	
}
