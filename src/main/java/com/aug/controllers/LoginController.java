package com.aug.controllers;

import java.io.Serializable;
import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.aug.hrdb.dto.LoginForgotDto;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.Appointment;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.LoginService;
import com.aug.services.EmailService;

@Controller
@SessionAttributes("login")
public class LoginController implements Serializable {

	private static Logger LOGGER = LoggerFactory.getLogger(LoginController.class);
	private static final long serialVersionUID = 1L;
	
	@Autowired
	private LoginService loginService;
	@Autowired
	private EmailService emailService;
	

	@RequestMapping(value = "/login", method = { RequestMethod.GET })
	public String loginSpring(Model model) {
		model.addAttribute("error", "true");
		return "login";

	}

	@RequestMapping(value = "/welcome", method = { RequestMethod.POST })
	public String loginSpringPost(Model model) {

		return "welcome";
	}
	
	@RequestMapping(value = "/logout", method = { RequestMethod.GET })
	public String logoutSpring(HttpSession session) {
		session.invalidate();
		return "redirect:/login";

	}
	

	
	
	@RequestMapping(value="/login/sendemail", method={RequestMethod.POST})
	public String sendMail(@RequestParam(value="receiver") String receiver, HttpServletRequest request) throws UnsupportedEncodingException{
		
		
		LoginForgotDto password = loginService.findPasswordByEmail(receiver);
		LOGGER.info("forgot email" +receiver);
		System.out.println("forgot email is" +receiver);
		String status = "fail";
		try {
			//send mail
			emailService.sendEmailForgotPassword(receiver,password.getPassword(), request);
			
			//set status
			status = "success";
			
		} catch(Exception exception) {
			exception.printStackTrace();
			System.out.println(exception);
		}
				
		return "redirect:/login"; 
	}
	
	
	@RequestMapping(value="/login/writeEmail", method={RequestMethod.GET})
	public String writeEmailLogin() {
		return "login";
	}
	

	

}
