package com.aug.controllers;

import java.io.Serializable;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class WelcomeController implements Serializable {
	
	private static final long serialVersionUID = 1L;
	
	@RequestMapping(value = "/welcome", method = { RequestMethod.GET })
	public String loginSpring() {
		return "welcome";

	}

}
