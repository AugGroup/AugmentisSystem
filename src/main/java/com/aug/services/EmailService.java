package com.aug.services;

import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletRequest;

import org.apache.velocity.VelocityContext;
import org.apache.velocity.app.VelocityEngine;
import org.apache.velocity.context.Context;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aug.hrdb.dto.AugRequestDto;
import com.aug.hrdb.dto.LoginForgotDto;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.Appointment;
import com.aug.hrdb.services.MasJobLevelService;
import com.aug.hrdb.services.MasTechnologyService;

@Transactional
@Service(value="emailService")
public class EmailService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	private VelocityEngine velocityEngine;
	
	@Autowired
	private MasJobLevelService masJoblevelService;
	
	@Autowired
	private MasTechnologyService masTechnologyService;
	
	public void sendEmail(final String receiver, final String cc, final String subject, 
			final String content,HttpServletRequest request) throws UnsupportedEncodingException {
		////create mail
		velocityEngine.init();
		StringWriter writer = new StringWriter();	
		
		//set context
		Context context = new VelocityContext();
		
		//set attachment path 
		final String path = request.getSession().getServletContext().getRealPath("/") + "/resources/mail-attachment/";
		
		//merge context and writer to String 
		velocityEngine.evaluate(context, writer, "Email", content); 
		
		//encode Template
		final String encode = new String(writer.toString().getBytes("UTF-8"),"UTF-8");
		
		//create mime message
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
		  public void prepare(MimeMessage mimeMessage) throws Exception {
		          
		        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		          message.setTo(receiver);
		          message.setSubject(subject);
		          //message.setFrom("chalisa.pat@augmentis.biz", "Chalisa Patanadamrongchai");
		          message.setFrom("anat.abd@augmentis.biz", "Anat Abdullagasim");
		          
//		          message.setReplyTo("anat.abd@augmentis.biz");
		          
		          //set cc
		          if (!cc.equals("")) {
		        	//split all cc email
		        	String[] allCc = cc.split(",");
		        	System.out.println(cc);
		  			message.setCc(allCc);
		  		  }

		          FileSystemResource map = new FileSystemResource(path + "map.jpg");
		          message.addAttachment(map.getFilename(), map);
		          
		          message.setText(encode, true);
		  }
		};
		
		//send email
		mailSender.send(preparator);
		
	}
	
	public void sendAppointmentMail(final Applicant sender, final Applicant receiver, final Appointment appointment, final String cc,
			final String subject, final String content, HttpServletRequest request) throws UnsupportedEncodingException {

		//date format
		SimpleDateFormat formatDate = new SimpleDateFormat("dd MMM yyyy");
		
		//time format
		SimpleDateFormat formatTime = new SimpleDateFormat("KK:mm aa");

		////create mail
		velocityEngine.init();
		StringWriter writer = new StringWriter();
		
		//define variable in mail template
		Context context = new VelocityContext();
		context.put("FIRST_NAME", receiver.getFirstNameEN());
		context.put("DATE", formatDate.format(appointment.getStart()));
		context.put("TIME", formatTime.format(appointment.getStart()));
		context.put("RECRUIT_FIRST_NAME", sender.getFirstNameEN());
		context.put("RECRUIT_LAST_NAME", sender.getLastNameEN());
		context.put("RECRUIT_POSITION", sender.getJobLevel().getName());
		context.put("RECRUIT_PHONE", sender.getTel());
		
		//set email attr
//		final String recipientAddress = applicant.getEmail();
//		final String recipientAddress = "anat.pantera@gmail.com";
		final String path = request.getSession().getServletContext().getRealPath("/") + "/resources/mail-attachment/";
		
		//merge context and writer to String 
		velocityEngine.evaluate(context, writer, "Email", content); 
		
		//encode Template
		final String encode = new String(writer.toString().getBytes("UTF-8"),"UTF-8");
		
		//create mime message
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
		  public void prepare(MimeMessage mimeMessage) throws Exception {
		          MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//		          message.setTo(receiver.getEmail());
		          message.setFrom("anat.abd@augmentis.biz", "Anat Abdullagasim");
		          message.setTo("anat.pantera@gmail.com");
		          message.setSubject(subject);
		          
		          //set cc
		          if (!cc.equals("")) {
		        	//split all cc email
		        	String[] allCc = cc.split(",");
		        	System.out.println(cc);
		  			message.setCc(allCc);
		  		  }
		          
		          FileSystemResource map = new FileSystemResource(path + "map.jpg");
		          message.addAttachment(map.getFilename(), map);
		          
		          message.setText(encode, true);
		  }
		};
		
		//send email
		mailSender.send(preparator);
	}
	
	public void sendNewJobCaseMail(final Applicant sender,
			final String subject, final AugRequestDto augRequest, final String content, HttpServletRequest request) throws UnsupportedEncodingException {
		//date format
		SimpleDateFormat formatDate = new SimpleDateFormat("dd MMM yyyy");
		
		////create mail
		velocityEngine.init();
		StringWriter writer = new StringWriter();
		//define variable in mail template
		Context context = new VelocityContext();
		context.put("CODE", augRequest.getJobcaseCode());
		context.put("REQUESTER", sender.getFirstNameEN() + " " + sender.getLastNameEN());
		context.put("REQUESTE_DATE", formatDate.format(augRequest.getRequestDate()));
		context.put("JOB_LEVEL", masJoblevelService.findById(augRequest.getJoblevelId()).getName());
		context.put("TECHNOLOGY", masTechnologyService.findById(augRequest.getTechnologyId()).getName());
		context.put("QUANTITY", augRequest.getNumberApplicant());
		context.put("SKILL", augRequest.getSpecificSkill());
		context.put("EXPERIENCE", augRequest.getYearExperience());
		
		//merge context and writer to String 
		velocityEngine.evaluate(context, writer, "Email", content); 
		
		//encode Template
		final String encode = new String(writer.toString().getBytes("UTF-8"),"UTF-8");
		
		//create mime message
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
		  public void prepare(MimeMessage mimeMessage) throws Exception {
		          MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
//		          message.setTo(receiver.getEmail());
		          message.setFrom("anat.abd@augmentis.biz", "Anat Abdullagasim");
		          //message.setTo(sender.getEmail());
		          message.setTo("bp_clash@hotmail.com");
		          message.setSubject(subject);
		          message.setText(encode, true);
		  }
		};
		System.out.println("ZZZZZZZZZZ "+ augRequest.getTechnologyStr());
		//send email
		mailSender.send(preparator);
	}
	
	public void sendEmailForgotPassword(final String receiver, 
			final LoginForgotDto login, HttpServletRequest request) throws UnsupportedEncodingException {
		final String cc = "";
		final String subject = "Forgot Password";
		
		////create mail
		velocityEngine.init();
		StringWriter writer = new StringWriter();	
		
		//set context
		Context context = new VelocityContext();
		
		//set attachment path 
		final String path = request.getSession().getServletContext().getRealPath("/") + "/resources/mail-attachment/";
		
		//merge context and writer to String 
		velocityEngine.evaluate(context, writer, "Email", "<p>Hello,</p><p>The following information for your account</p><br> "
				+ "<p><strong>Username:&nbsp;" + login.getUsername() +"</strong></p><p><strong>Password:&nbsp;" + login.getPassword() +"</strong></p><p>&nbsp;</p>"
				+ "<p>This is an automated message. "
				+ "Please do not reply to this email.</p><p>Thanks,</p><p>Augmentis Thailand.</p>"); 
		
		//encode Template
		final String encode = new String(writer.toString().getBytes("UTF-8"),"UTF-8");
		
		//create mime message
		MimeMessagePreparator preparator = new MimeMessagePreparator() {
		  public void prepare(MimeMessage mimeMessage) throws Exception {
		          
		        MimeMessageHelper message = new MimeMessageHelper(mimeMessage, true, "UTF-8");
		          //message.setTo(receiver);
		          message.setTo("bp_clash@hotmail.com");
		          message.setSubject(subject);
		          //message.setFrom("chalisa.pat@augmentis.biz", "Chalisa Patanadamrongchai");
		          message.setFrom("anat.abd@augmentis.biz", "Anat Abdullagasim");
		          
		          message.setText(encode, true);
		  }
		};
		
		//send email
		mailSender.send(preparator);
		
	}
}
