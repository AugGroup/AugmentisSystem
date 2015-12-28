package com.aug.controllers;

import java.util.List;

import com.aug.hrdb.entities.*;
import com.aug.services.GenerateCareerCodeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

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

	@Autowired
	private GenerateCareerCodeService generateCareerCodeService;
	
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
	
	@RequestMapping(value="/careercase", method={RequestMethod.GET})
	public String careerCase() {

		LOGGER.info("Mapping: /careercase");
		return "career-case";
	}

	@RequestMapping(value = "/careercase/create", method = {RequestMethod.POST})
	public @ResponseBody CareerCase createCareerCase(@RequestBody CareerCase careerCase) {

		LOGGER.info("Mapping: /careercase/create");
		try {
			MasDivision division = masDivisionService.findById(careerCase.getMasDivision().getId());
			String code = generateCareerCodeService.generateCareerCaseCode(division);
			if (code == null) {
				LOGGER.info("generate code: null");
			} else {
				LOGGER.info("generate code: " + code);
				careerCase.setCode(code);
				careerCaseService.create(careerCase);
				LOGGER.info("career case id: " + careerCase.getId());
			}
		} catch (Exception ex) {
			LOGGER.info("Error!!");
			ex.printStackTrace();
			careerCase = null;
		}



		return careerCaseService.findById(careerCase.getId());
	}
	
}


































