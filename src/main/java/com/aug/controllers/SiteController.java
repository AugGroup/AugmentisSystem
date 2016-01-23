package com.aug.controllers;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Locale;

import javax.validation.ConstraintViolationException;

import org.apache.http.HttpException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.aug.exception.CustomException;
import com.aug.hrdb.dto.SiteDto;
import com.aug.hrdb.entities.Site;
import com.aug.hrdb.services.SiteDtoService;
import com.aug.hrdb.services.SiteService;

import javassist.tools.web.BadHttpRequest;



@Controller
public class SiteController {
	
	@Autowired
	private SiteDtoService siteDtoService;
	@Autowired
	private SiteService siteService;
	
	
	@RequestMapping(value = "/site/{id}", method = RequestMethod.GET)
	public String initSite(Locale locale,
			@ModelAttribute(value = "site") Site site,
			ModelMap model, 
			@PathVariable("id") Integer id, 
			@ModelAttribute SiteDto siteDto) {
		
		siteDto.setEmployeeId(id);
		model.addAttribute("id", id);
		model.addAttribute("site", site);
		return "/HrSystem/site";
	}

	
	@RequestMapping(value = "/site/list/{id}", method = RequestMethod.POST)
	public @ResponseBody List<SiteDto> findData(Locale locale,
			@PathVariable("id") Integer id,
			ModelMap model)  {
		
		    List<SiteDto> siteDto =  siteDtoService.listByNameNativeQuery(id);		    
		    return siteDto;
		   
	}
	
	
	@RequestMapping(value = "/site/add", method = RequestMethod.POST)
	public @ResponseBody SiteDto add(Locale locale,
				@RequestBody SiteDto siteDto,
				ModelMap model) throws SQLException,Exception,BadHttpRequest,IOException,ConstraintViolationException,HttpMediaTypeNotSupportedException,HttpException,CustomException{
		
			if(siteDto.getProjectName().isEmpty()||siteDto.getProjectOwner().isEmpty()||siteDto.getProjectOwnerContact().isEmpty()||
					siteDto.getStartDate()==null||siteDto.getEndDate()==null){
				throw new CustomException("Bussiness Error", "It have some or Any field is required!");
			}else{
				
				if(siteDto.getStartDate().compareTo(siteDto.getEndDate())>0){
					
					throw new CustomException("Bussiness Error", "Start Date is more than End Date!");
					
				}else if(siteDto.getStartDate().compareTo(siteDto.getEndDate())==0){
					
					throw new CustomException("Bussiness Error", "Start Date is equal End Date!");

					
				}else if(siteDto.getStartDate().compareTo(siteDto.getEndDate())<0){
					siteService.createSetDtoToEntity(siteDto);
				}
				
			}
			
		    
			return siteDto;
		   
	}
	
	
	@RequestMapping(value = "/site/initedit", method = RequestMethod.POST)
	public @ResponseBody SiteDto initEdit(Locale locale,
				@RequestBody SiteDto siteDto,
				ModelMap model)  throws SQLException,Exception,BadHttpRequest,IOException,ConstraintViolationException,HttpMediaTypeNotSupportedException,HttpException{
		
		SiteDto  siteDtoReturnToPage =  siteService.findByIdReturnToDto(siteDto.getId());
		return siteDtoReturnToPage;
		   
	}
	
	
	@RequestMapping(value = "/site/edit", method = RequestMethod.POST)
	public @ResponseBody SiteDto edit(Locale locale,
				@RequestBody SiteDto siteDto,
				ModelMap model) throws SQLException,Exception,BadHttpRequest,IOException,ConstraintViolationException,HttpMediaTypeNotSupportedException,HttpException,CustomException{
		
		
		if(siteDto.getProjectName().isEmpty()||siteDto.getProjectOwner().isEmpty()||siteDto.getProjectOwnerContact().isEmpty()||
				siteDto.getStartDate()==null||siteDto.getEndDate()==null){
			throw new CustomException("Bussiness Error", "It have some or Any field is required!");
		}else{
			
			if(siteDto.getStartDate().compareTo(siteDto.getEndDate())>0){
				
				throw new CustomException("Bussiness Error", "Start Date is more than End Date!");
				
			}else if(siteDto.getStartDate().compareTo(siteDto.getEndDate())==0){
				
				throw new CustomException("Bussiness Error", "Start Date is equal End Date!");

				
			}else if(siteDto.getStartDate().compareTo(siteDto.getEndDate())<0){
				siteService.updateSetDtoToEntity(siteDto);

			}
			
		}
		
		return siteDto;
		   
	}
	
	
	
	@RequestMapping(value = "/site/delete", method = RequestMethod.POST)
	public @ResponseBody SiteDto delete(Locale locale,
				@RequestBody SiteDto siteDto,
				ModelMap model) throws SQLException,Exception,BadHttpRequest,IOException,ConstraintViolationException,HttpMediaTypeNotSupportedException,HttpException{
		
		Site site = siteService.find(siteDto.getId());
		siteService.delete(site);
		return siteDto;
		   
	}
}
