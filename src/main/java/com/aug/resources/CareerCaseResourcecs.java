package com.aug.resources;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.aug.hrdb.entities.CareerCase;
import com.aug.hrdb.services.CareerCaseService;

@RestController
public class CareerCaseResourcecs {

	private Logger LOGGER = LoggerFactory.getLogger(CareerCaseResourcecs.class);
	
	@Autowired
	private CareerCaseService careerCaseService;
	
	@RequestMapping(value = "/api/careercases", method = RequestMethod.GET)
    public List<CareerCase> findAllCareerCase() {

        LOGGER.debug("Mapping: /api/careercases");

        List<CareerCase> careerCases = careerCaseService.findAll();

        LOGGER.debug("Total CareerCases: " + careerCases.size());

        return careerCases;
    }
	
}
