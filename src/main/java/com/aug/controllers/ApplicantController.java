package com.aug.controllers;

import java.io.IOException;
import java.io.Serializable;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.hibernate.Hibernate;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.aug.hrdb.dto.AbilityDto;
import com.aug.hrdb.dto.AddressDto;
import com.aug.hrdb.dto.ApplicantDto;
import com.aug.hrdb.dto.AugRequestDto;
import com.aug.hrdb.dto.CertificationDto;
import com.aug.hrdb.dto.EducationDto;
import com.aug.hrdb.dto.ExperienceDto;
import com.aug.hrdb.dto.FamilyDto;
import com.aug.hrdb.dto.JoblevelDto;
import com.aug.hrdb.dto.LanguageDto;
import com.aug.hrdb.dto.ReferenceDto;
import com.aug.hrdb.dto.ReportApplicantDto;
import com.aug.hrdb.dto.SearchReportDto;
import com.aug.hrdb.entities.Ability;
import com.aug.hrdb.entities.Address;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.Certification;
import com.aug.hrdb.entities.Education;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Experience;
import com.aug.hrdb.entities.Family;
import com.aug.hrdb.entities.Language;
import com.aug.hrdb.entities.MasAddressType;
import com.aug.hrdb.entities.MasDegreeType;
import com.aug.hrdb.entities.MasDivision;
import com.aug.hrdb.entities.MasJobLevel;
import com.aug.hrdb.entities.MasLocation;
import com.aug.hrdb.entities.MasProvince;
import com.aug.hrdb.entities.MasRelationType;
import com.aug.hrdb.entities.MasSpecialty;
import com.aug.hrdb.entities.MasTechnology;
import com.aug.hrdb.entities.Reference;
import com.aug.hrdb.services.AbilityService;
import com.aug.hrdb.services.AddressService;
import com.aug.hrdb.services.ApplicantService;
import com.aug.hrdb.services.AugRequestService;
import com.aug.hrdb.services.CertificationService;
import com.aug.hrdb.services.EducationService;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.ExperienceService;
import com.aug.hrdb.services.FamilyService;
import com.aug.hrdb.services.LanguageService;
import com.aug.hrdb.services.MasAddressTypeService;
import com.aug.hrdb.services.MasDegreeTypeService;
import com.aug.hrdb.services.MasDivisionService;
import com.aug.hrdb.services.MasJobLevelService;
import com.aug.hrdb.services.MasLocationService;
import com.aug.hrdb.services.MasProvinceService;
import com.aug.hrdb.services.MasRelationTypeService;
import com.aug.hrdb.services.MasSpecialtyService;
import com.aug.hrdb.services.MasTechnologyService;
import com.aug.hrdb.services.ReferenceService;
import com.aug.services.DownloadService;
import com.aug.services.ReportService;
import com.aug.services.utils.UploadService;

import net.sf.jasperreports.engine.JRParameter;

@Controller
public class ApplicantController implements Serializable {

	private static final long serialVersionUID = 1L;
	private static Logger LOGGER = LoggerFactory.getLogger(ApplicantController.class);

	@Autowired
	private ApplicantService applicantService;
	@Autowired
	UploadService uploadService;
	@Autowired
	private ReferenceService referenceService;
	@Autowired
	private AddressService addressService;
	@Autowired
	private ExperienceService experienceService;
	@Autowired
	private EducationService educationService;
	@Autowired
	private LanguageService languageService;
	@Autowired
	private CertificationService certificationService;
	@Autowired
	private FamilyService familyService;
	@Autowired
	private DownloadService downloadService;
	@Autowired
	private MasTechnologyService masTechnologyService;
	@Autowired
	private MasJobLevelService masJoblevelService;
	@Autowired
	private MasAddressTypeService masAddressTypeService;
	@Autowired
	private MasProvinceService masProvinceService;
	@Autowired
	private MasRelationTypeService masRelationService;
	@Autowired
	private MasDegreeTypeService masDegreeTypeService;
	@Autowired
	private MasSpecialtyService masSpecialtyService;
	@Autowired
	private AbilityService abilityService;
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private MasDivisionService masDivisionService;
	@Autowired
	private MasLocationService masLocationService;
	
	@Autowired
	private ReportService reportService;
	@Autowired
	private AugRequestService augRequestService;
	
	@RequestMapping(value = {"/","/applicant"}, method = { RequestMethod.GET })
	public String helloPage(Model model) {
		User user = (User) SecurityContextHolder.getContext()
				.getAuthentication().getPrincipal();
		String name = user.getUsername();
		model.addAttribute("name", name);
		
		return "mainApplicant";
	}

	/*-------------------- initBinder --------------------*/
	@InitBinder
	public void InitBinder(WebDataBinder binder) {
		SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy",
				Locale.ENGLISH);
		binder.registerCustomEditor(Date.class, new CustomDateEditor(
				dateFormat, true));
		
	}

	/*-- search all applicant and applicant by position for dataTable--*/
	@RequestMapping(value = "/applicant/search", method = { RequestMethod.POST })
	public @ResponseBody Object searchByJoblevel(@RequestParam final String joblevelStr) throws Exception {
		
		List<ApplicantDto> data = applicantService.findByJoblevel(joblevelStr);
		if (StringUtils.isEmpty(joblevelStr)) {
			data = applicantService.findAllApplicant();
		}
		final List<ApplicantDto> datas = data;
		return new Object() {
			@SuppressWarnings("unused")
			public List<ApplicantDto> getData() {
				return datas;
			}
		};
	}

	// Search Applicant By Id
	@RequestMapping(value = "/applicant/search/{id}", method = { RequestMethod.POST })
	public @ResponseBody ApplicantDto findById(@PathVariable Integer id)
			throws Exception {
		return applicantService.findApplicantById(id);
	}

	@RequestMapping(value = "/findByIdApplication/{id}", method = { RequestMethod.POST })
	public @ResponseBody ApplicantDto findByIdApplication(
			@PathVariable Integer id) throws Exception {

		return applicantService.findApplicationById(id);
	}

	// Edit Applicant Score
	@RequestMapping(value = "/update/score/{id}", method = { RequestMethod.POST })
	public @ResponseBody ApplicantDto updateUser(
			@RequestBody ApplicantDto applicantDto, @PathVariable Integer id)
			throws Exception {

		Applicant applicant = applicantService.findById(applicantDto.getId());
		applicant.setScore(applicantDto.getScore());
		applicant.setTechScore(applicantDto.getTechScore());
		applicant.setAttitudeHome(applicantDto.getAttitudeHome());
		applicant.setAttitudeOffice(applicantDto.getAttitudeOffice());
		applicant.setTrackingStatus(applicantDto.getTrackingStatus());
		applicant.setMasLocation("TH");
		
		if (applicant.getTrackingStatus().equals("Approve") && applicant.getTechScore().equals("Pass")) {
			
			//find user
			UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			System.out.println("userName : " + userDetails.getUsername());
			System.out.println("LOCATIONAPPLICANT :: " + applicant.getMasLocation());
			
			Employee employee = new Employee();

			employee.setApplicant(applicant);
			String str = employeeService.generateEmployeeCodeFixData(applicant.getMasLocation());
			System.out.println("SSTRING :: " + str);
			employee.setEmployeeCode(str);
			employee.setStatusEmp("Employee");
			MasDivision masDivision = masDivisionService.findById(5);
			MasLocation masLocation = masLocationService.findById(1);
			employee.setMasDivision(masDivision);
			employee.setMasLocation(masLocation);
			employee.setTelHome("00-0000000");
			employeeService.create(employee);
		}

		applicantService.update(applicant);

		return applicantDto;

	}

	@RequestMapping(value = "/delete/{id}", method = RequestMethod.POST)
	public @ResponseBody String delesteUser(@PathVariable("id") Integer id) {
		
		applicantService.deleteById(id);
		return "success";
	}

	/*-------------------- Report Method --------------------*/
	// Main report
	@RequestMapping(value = "/report", method = RequestMethod.GET)
	public String mainReport() {
		return "mainReport";
	}

	/*-------------------- search all applicant and search applicant for Report dataTable--------------------*/
	@RequestMapping(value = "/report/search", method = { RequestMethod.POST })
	public @ResponseBody Object searchReportBy(@RequestParam Integer technology,Integer joblevel,
			Integer masdegreetype, String major, String university, Double gpa)
			throws Exception {

		System.out.println("technology : " + technology);
		System.out.println("joblevel : " + joblevel);
		System.out.println("dagree : " + masdegreetype);
		System.out.println("major : " + major);
		System.out.println("university : " + university);
		System.out.println("gpa : " + gpa);
		
		final List<ReportApplicantDto> data;
		data = applicantService.findReportByCriteria(technology,joblevel, masdegreetype, major, university, gpa);

		return new Object() {
			@SuppressWarnings("unused")
			public List<ReportApplicantDto> getData() {
				return data;
			}
		};
	}

	/*-------------------- preview reports function--------------------*/
	@RequestMapping(value = "/report/preview", method = { RequestMethod.POST,RequestMethod.GET })
	public ModelAndView previewReport(@ModelAttribute SearchReportDto searchReportDTO,
			HttpSession session) throws Exception {
		
		List<ReportApplicantDto> reportApplicantList = null;
		Integer technology = searchReportDTO.getTechnology();
		Integer joblevel = searchReportDTO.getJoblevel();
		Integer masdegreetype = searchReportDTO.getMasdegreetype();
		String major = searchReportDTO.getMajor();
		String schoolName = searchReportDTO.getSchoolName();
		Double gpa = searchReportDTO.getGpa();
		
		String reportType = searchReportDTO.getReportType();
		
		if (technology == -1 && joblevel == -1 && masdegreetype.equals("") && major.isEmpty() && schoolName.isEmpty() && gpa == null) {
			reportApplicantList = applicantService.reportApplicant();
		} else {
			reportApplicantList = applicantService.findReportByCriteria(technology , joblevel , masdegreetype , major , schoolName , gpa);// search by
		}
		
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		parameterMap.put("date", new java.util.Date());
		
		String schoolName1 = "";
		String major1 = "";
		String technology1 = "";
		String joblevel1 ="";
		String masdegreetype1="";
		String gpa1="";
		
		if( !StringUtils.isEmpty(schoolName)&& schoolName.length()>0){
			schoolName1 = " AND education.UNIVERSITY = '"+schoolName+"'";
		}
		if( !StringUtils.isEmpty(major) && major.length() >0 ){
			major1 = " AND education.MAJOR = '"+major+"'";
		}
		if(technology > 0){
			technology1 = " AND technology.ID = "+technology;
		}
		if(joblevel > 0 ){
			joblevel1 = " AND joblevel.ID = "+joblevel;
		}
		if(masdegreetype > 0 ){
			 masdegreetype1 = " AND degreeType.ID = "+masdegreetype;
		}
		if(gpa != null){
			gpa1 = " AND education.GPA = "+gpa;
		}
		
		parameterMap.put("UNIVERSITY",schoolName1);
		parameterMap.put("MAJOR",major1);
		parameterMap.put("TECHNOLOGY", technology1);
		parameterMap.put("JOBLEVEL", joblevel1);
		parameterMap.put("DEGREE",masdegreetype1);
		parameterMap.put("GPA",gpa1);
		
		ModelAndView mv = reportService.getReport(reportApplicantList,
				"mainReport", reportType, parameterMap);
		return mv;
	}

	// Monthly report
	@RequestMapping(value = "/monthlyReport", method = RequestMethod.GET)
	public String modalMonthlyReport() {
		return "monthlyReport";
	}

	/*-------------------- search all applicant and search applicant for Report dataTable--------------------*/
	@RequestMapping(value = "/report/searchMonth", method = { RequestMethod.POST })
	public @ResponseBody Object searchReportByMonth(@RequestParam String applyDateStr) throws NotFoundException {

		List<ReportApplicantDto> data;

		if (!applyDateStr.isEmpty()) {
			String dateStr = applyDateStr;
			String[] parts = dateStr.split(" \\- ");
			String startDate = parts[0];
			String endDate = parts[1];
			System.out.println("startDate : " + startDate);
			System.out.println("endDate : " + endDate);
			data = applicantService.findReportByMonth(startDate, endDate);
		} else {
			data = applicantService.findReportByCriteria(-1,-1, -1, "", "", null);

		}
		final List<ReportApplicantDto> datas = data;
		return new Object() {
			@SuppressWarnings("unused")
			public List<ReportApplicantDto> getData() {
				return datas;
			}
		};
	}

	@RequestMapping(value = "/reportMonthly/preview", method = { RequestMethod.POST })
	public ModelAndView searchMonthlyReport(
			@ModelAttribute SearchReportDto searchReportDTO,
			HttpSession session, Locale locale) {
		List<ReportApplicantDto> reportApplicantList = null;
		String applyDate = searchReportDTO.getApplyDateStr();

		String reportType = searchReportDTO.getReportType();
		String startDate = "";
		String endDate = "";
		if (!applyDate.isEmpty()) {
			String dateStr = applyDate;
			String[] parts = dateStr.split(" \\- ");
			startDate = parts[0];
			endDate = parts[1];
			reportApplicantList = applicantService.findReportByMonth(startDate,
					endDate);
		} else {
			reportApplicantList = applicantService.reportApplicant();
		}
		
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		parameterMap.put("date", new java.util.Date());
		parameterMap.put("startDate", startDate);
		parameterMap.put("endDate", endDate);
		parameterMap.put(JRParameter.REPORT_LOCALE, Locale.ENGLISH);
		ModelAndView mv = reportService.getReport(reportApplicantList,
				"monthlyReport", reportType, parameterMap);
		return mv;
	}
	/*-------------------- Position List--------------------*/
	@ModelAttribute("searchReportDTO")
	public SearchReportDto getsearchReport() {
		return new SearchReportDto();

	}
	
	//================================== Application ===============================
	
	@RequestMapping(value = "/applicationMenu", method = { RequestMethod.GET })
	public String applicationMenu(Model model) {
		LOGGER.info("**** Welcome to Application Controller ****");
		return "applicationMenu";

	}
	
	//////////////////        SAVE METHOD        /////////////////////

	@RequestMapping(value = "/saveInformations", method = { RequestMethod.POST })
	public String saveInformations(@ModelAttribute ApplicantDto applicantDto,MultipartFile multipartFile,Model model)
			throws ParseException {
		int year = Calendar.getInstance().get(Calendar.YEAR);
		
		if(applicantService.getMaxApplicantId().getId() < 10){
			applicantDto.setCode("C"+year+"0"+(applicantService.getMaxApplicantId().getId()+1));
		} else {
			applicantDto.setCode("C"+year+(applicantService.getMaxApplicantId().getId()+1));
		}
		
		
		if(applicantDto.getImageMultipartFile()!=null&&applicantDto.getImageMultipartFile().getSize()>0){
			try {
				applicantDto.setImage(applicantDto.getImageMultipartFile().getOriginalFilename());
				uploadService.uploadImage("Applicant",applicantDto.getImageMultipartFile().getOriginalFilename(),applicantDto.getImageMultipartFile());
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if(applicantDto.getResumeMultipartFile()!=null&&applicantDto.getResumeMultipartFile().getSize()>0){
			try {
				applicantDto.setResume(applicantDto.getResumeMultipartFile().getOriginalFilename());
				uploadService.uploadImage("Applicant",applicantDto.getResumeMultipartFile().getOriginalFilename(),applicantDto.getResumeMultipartFile());
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if(applicantDto.getTranscriptMultipartFile()!=null&&applicantDto.getTranscriptMultipartFile().getSize()>0){
			try {
				applicantDto.setTranscript(applicantDto.getTranscriptMultipartFile().getOriginalFilename());
				uploadService.uploadImage("Applicant",applicantDto.getTranscriptMultipartFile().getOriginalFilename(),applicantDto.getTranscriptMultipartFile());
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		applicantService.saveInformations(applicantDto);
		
		return "redirect:/applicant";
	}

	@RequestMapping(value = "/address/{id}", method = { RequestMethod.POST })
	public @ResponseBody Address saveAddress(@RequestBody Address address,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		addressService.create(address);
		Address addr = addressService.findById(id);
		
        return addr;
	}
	
	@RequestMapping(value = "/family/{id}", method = { RequestMethod.POST })
	public @ResponseBody Family saveFamily(@RequestBody Family family,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		familyService.create(family);
		Family fam = familyService.find(id);
		Hibernate.initialize(fam.getApplicant().getTechnology());
		Hibernate.initialize(fam.getApplicant().getJobLevel());
		
        return fam;
	}
	
	@RequestMapping(value = "/educations/{id}", method = { RequestMethod.POST })
	public @ResponseBody Education educations(@RequestBody Education education,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		educationService.create(education);
		Education ed = educationService.findById(id);
		
        return ed;
	}
	
	@RequestMapping(value = "/certificates/{id}", method = { RequestMethod.POST })
	public @ResponseBody Certification certification(@RequestBody Certification certification,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		certificationService.create(certification);
		Certification cer = certificationService.findById(id);
		Hibernate.initialize(cer.getApplicant().getTechnology());
		Hibernate.initialize(cer.getApplicant().getJobLevel());
		
        return cer;
	}
	
	@RequestMapping(value = "/skills/{id}", method = { RequestMethod.POST })
	public @ResponseBody String skill(@RequestBody Ability ability,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		
		String result = "fail";
		
		MasSpecialty masSpecialty = ability.getMasspecialty();
		
		if (abilityService.checkSpecialty(id,masSpecialty.getId())) {
				abilityService.create(ability);
				System.out.println("can save");
				result = "success";
		} else {
			System.out.println("Not Save!!");
		}
		
		System.out.println("final " + result);
		
        return result;
	}
	
	@RequestMapping(value = "/languages/{id}", method = { RequestMethod.POST })
	public @ResponseBody String language(@RequestBody Language language,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);

		String result = "fail";
		if(languageService.checkLanguageName(id, language.getNameLanguage())){
			languageService.create(language);
			result = "success";
		} else {
			System.out.println("Not Save!!");
		}
		
		System.out.println("final " + result);
		
        return result;
	}
	

	@RequestMapping(value = "/references/{id}", method = { RequestMethod.POST })
	public @ResponseBody Reference references(@RequestBody Reference reference,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		referenceService.create(reference);
		Reference ref = referenceService.findById(id);

        return ref;
	}
	
	@RequestMapping(value = "/experiences/{id}", method = { RequestMethod.POST })
	public @ResponseBody Experience experiences(@RequestBody Experience experience,@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		experienceService.create(experience);
		Experience exp = experienceService.findById(id);
		Hibernate.initialize(exp.getApplicant().getTechnology());
		Hibernate.initialize(exp.getApplicant().getJobLevel());
		
        return exp;
	}
	//////////////////        LINK PAGE       ///////////////////////////
	

	@RequestMapping(value = "/informations", method = { RequestMethod.GET })
	public ModelAndView informations(/*Model model*/) {
		LOGGER.info("**** Welcome to Application Controller ****");
		ModelAndView modelView = new ModelAndView();
		modelView.setViewName("newApplicant");
		
		return modelView;
	}
	
	@RequestMapping(value = "/address/{id}", method = { RequestMethod.GET })
	public String address(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "address";
		model.addAttribute("tag",tag);
		
        return "address";
	}
	
	@RequestMapping(value = "/families/{id}", method = { RequestMethod.GET })
	public String family(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "family";
		model.addAttribute("tag",tag);
		
        return "family";
	}
	
	@RequestMapping(value = "/educations/{id}", method = { RequestMethod.GET })
	public String educations(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "education";
		model.addAttribute("tag",tag);
		
        return "educations";
	}
	
	@RequestMapping(value = "/certificates/{id}", method = { RequestMethod.GET })
	public String certificate(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "certificate";
		model.addAttribute("tag",tag);
		
        return "certificate";
	}
	
	@RequestMapping(value = "/skills/{id}", method = { RequestMethod.GET })
	public String skills(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "skill";
		model.addAttribute("tag",tag);
		
        return "skills";
	}
	
	@RequestMapping(value = "/languages/{id}", method = { RequestMethod.GET })
	public String languages(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "languages";
		model.addAttribute("tag",tag);
		
        return "languages";
	}
	
	@RequestMapping(value = "/references/{id}", method = { RequestMethod.GET })
	public String references(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "reference";
		model.addAttribute("tag",tag);
		
        return "references";
	}
	
	@RequestMapping(value = "/experiences/{id}", method = { RequestMethod.GET })
	public String experiences(@PathVariable Integer id,Model model) {
		model.addAttribute("id",id);
		String tag = "experience";
		model.addAttribute("tag",tag);
		
        return "experiences";
	}

    //////////////////        UPDATE METHOD        /////////////////////
	
	// Search Every Class By Id For Show In Text Box
	
	@RequestMapping(value = "/dowloadResume/{id}", method = RequestMethod.GET)
	public String dowloadResume(@PathVariable Integer id,HttpServletRequest request,HttpServletResponse response) {
 
		String filename = applicantService.findApplicationById(id).getResume();
		downloadService.download(request,response,"Applicant", filename);
		
		return "informations";
	}

	@RequestMapping(value = "/dowloadTranscript/{id}", method = RequestMethod.GET)
	public  String dowloadTranscript(@PathVariable Integer id,HttpServletRequest request,HttpServletResponse response) {
 
		String filename = applicantService.findApplicationById(id).getTranscript();
		downloadService.download(request,response,"Applicant", filename);
		
		return "informations";
	}
	@RequestMapping(value = "/info/{id}", method = { RequestMethod.GET })
	public String updateInfo(@ModelAttribute ApplicantDto applicantDto,@PathVariable Integer id, Model  model) {
		applicantDto = applicantService.findByIdApplicant(id);
		model.addAttribute("tag","information");
		applicantDto.setTechnology(masTechnologyService.findById(applicantDto.getTechnologyId()));
		applicantDto.setJoblevel(masJoblevelService.findById(applicantDto.getJoblevelId()));
		model.addAttribute("applicant", applicantDto);
		System.out.println("TECHNOLOGY : "+applicantDto.getTechnology());
		System.out.println("JOBLEVEL : "+applicantDto.getJoblevel());
		System.out.println("Tracking Status : "+applicantDto.getTrackingStatus());
		
		return "informations";
	}
	
	@RequestMapping(value = "/infoEdit/{id}", method = { RequestMethod.POST })
	public String updateInformations(@ModelAttribute ApplicantDto applicantDto,@PathVariable Integer id,Model  model,MultipartFile multipartFile) {
		if(applicantDto.getImageMultipartFile()!=null&&applicantDto.getImageMultipartFile().getSize()>0){
			try {
				applicantDto.setImage(applicantDto.getImageMultipartFile().getOriginalFilename());
				uploadService.uploadImage("Applicant",applicantDto.getImageMultipartFile().getOriginalFilename(),applicantDto.getImageMultipartFile());
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if(applicantDto.getResumeMultipartFile()!=null&&applicantDto.getResumeMultipartFile().getSize()>0){
			try {
				applicantDto.setResume(applicantDto.getResumeMultipartFile().getOriginalFilename());
				uploadService.uploadImage("Applicant",applicantDto.getResumeMultipartFile().getOriginalFilename(),applicantDto.getResumeMultipartFile());
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if(applicantDto.getTranscriptMultipartFile()!=null&&applicantDto.getTranscriptMultipartFile().getSize()>0){
			try {
				applicantDto.setTranscript(applicantDto.getTranscriptMultipartFile().getOriginalFilename());
				uploadService.uploadImage("Applicant",applicantDto.getTranscriptMultipartFile().getOriginalFilename(),applicantDto.getTranscriptMultipartFile());
			} catch (RuntimeException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	
		applicantService.update(applicantDto);
		model.addAttribute("applicant", applicantDto);

		return "redirect:/address/" + id;
	}
	
	@RequestMapping(value = "/findByIdApplicants/{id}", method = { RequestMethod.POST })
	public @ResponseBody ApplicantDto findByIdApplications(@RequestBody ApplicantDto applicantDto,@PathVariable Integer id) {
		applicantDto = applicantService.findApplicationById(id);
		return applicantDto;
	}
	
	@RequestMapping(value = "/findAddressId/{id}", method = { RequestMethod.POST })
	public @ResponseBody AddressDto findAddress(@PathVariable Integer id) {
		return addressService.findAddress(id);
	}
	
	@RequestMapping(value = "/findFamilyId/{id}", method = { RequestMethod.POST })
	public @ResponseBody FamilyDto findFamily(@PathVariable Integer id) {
		return familyService.findFamily(id);
	}
	
	@RequestMapping(value = "/findEducationId/{id}", method = { RequestMethod.POST })
	public @ResponseBody EducationDto findEducation(@PathVariable Integer id) {
		return educationService.findByEducationId(id);
		
	}
	
	@RequestMapping(value = "/findCertificateId/{id}", method = { RequestMethod.POST })
	public @ResponseBody CertificationDto findCertificated(@PathVariable Integer id) {
		return certificationService.findCertificate(id);
	}
	
	@RequestMapping(value = "/findSkillId/{id}", method = { RequestMethod.POST })
	public @ResponseBody AbilityDto findSkill(@PathVariable Integer id) {
		return abilityService.findByAbilityId(id);
	}
	
	@RequestMapping(value = "/findLanguagesId/{id}", method = { RequestMethod.POST })
	public @ResponseBody LanguageDto findLanguage(@PathVariable Integer id) {
		return languageService.findByLanguagesId(id);
	}
	
	@RequestMapping(value = "/findReferenceId/{id}", method = { RequestMethod.POST })
	public @ResponseBody ReferenceDto findReference(@PathVariable Integer id) {
		return referenceService.findReference(id);
	}
	
	@RequestMapping(value = "/findExperienceId/{id}", method = { RequestMethod.POST })
	public @ResponseBody ExperienceDto findExperience(@PathVariable Integer id) {
		return experienceService.findExperience(id);
	}
	
	//Get Data For Show In DataTable
	
	@RequestMapping(value = "/findByIdAddress/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdAddress(@PathVariable Integer id) {
		final List<AddressDto> list= addressService.findAddressById(id);
		return new Object() {
			@SuppressWarnings("unused")
			public List<AddressDto> getData() {
				return list;
			}
		};
	}
	
	@RequestMapping(value = "/findByIdFamily/{id}", method = { RequestMethod.POST })
	public @ResponseBody List<FamilyDto> findByIdFamily(@PathVariable Integer id) {
		return familyService.findFamilyById(id);
		
	}
	
	@RequestMapping(value = "/findByIdEducation/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdEducation(@PathVariable Integer id) {
		 final List<EducationDto> list = educationService.findEducationById(id);
		 
		return new Object() {
			@SuppressWarnings("unused")
			public List<EducationDto> getData() {
				return list;
			}
		};
	}
	
	@RequestMapping(value = "/findByIdCertificate/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdCertificaten(@PathVariable Integer id) {
		final List<CertificationDto> list = certificationService.findCertificateById(id);
		for(CertificationDto cer : list){
			System.out.println(cer.getName());
		}
		 
		return new Object() {
			@SuppressWarnings("unused")
			public List<CertificationDto> getData() {
				return list;
			}
		};
	}
	
	@RequestMapping(value = "/findByIdSkill/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdSkill(@PathVariable Integer id) {
		 final List<AbilityDto> list = abilityService.searchAbility(id);
		 
		return new Object() {
			@SuppressWarnings("unused")
			public List<AbilityDto> getData() {
				return list;
			}
			
		};
	}
	
	@RequestMapping(value = "/findByIdLanguages/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdLanguages(@PathVariable Integer id) {
		 final List<LanguageDto> list = languageService.findLanguagesById(id);
		 
		return new Object() {
			@SuppressWarnings("unused")
			public List<LanguageDto> getData() {
				return list;
			}
		};
	}
	
	@RequestMapping(value = "/findByIdReference/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdReference(@PathVariable Integer id) {
		 final List<ReferenceDto> list = referenceService.findReferenceById(id);
		 
		return new Object() {
			@SuppressWarnings("unused")
			public List<ReferenceDto> getData() {
				return list;
			}
		};
	}
	
	@RequestMapping(value = "/findByIdExperience/{id}", method = { RequestMethod.POST })
	public @ResponseBody Object findByIdExperience(@PathVariable Integer id) {
		final List<ExperienceDto> list= experienceService.findExperienceById(id);
 
		return new Object() {
			@SuppressWarnings("unused")
			public List<ExperienceDto> getData() {
				return list;
			}
		};
	}
	
	//Update Data In DataTable
	
	@RequestMapping(value = "/updateAddress/{id}", method = { RequestMethod.POST })
	public @ResponseBody AddressDto updateAddress(@RequestBody AddressDto addressDto, @PathVariable Integer id) {
		Address address = addressService.findById(addressDto.getId());
		MasAddressType masAddressType = masAddressTypeService.findById(addressDto.getAddressTypeId());
		MasProvince masProvince = masProvinceService.findById(addressDto.getMasprovinceId());
		
		address.setId(addressDto.getId());
		address.setAddressType(masAddressType);
		address.setHouseNo(addressDto.getHouseNo());
		address.setRoad(addressDto.getRoad());
		address.setDistrict(addressDto.getDistrict());
		address.setSubDistrict(addressDto.getSubDistrict());
		address.setProvince(masProvince);
		address.setZipcode(addressDto.getZipcode());
		
		addressService.update(address);
		
		return addressDto;
	}
	
	@RequestMapping(value = "/updateFamily/{id}", method = { RequestMethod.POST })
	public @ResponseBody FamilyDto updateFamily(@RequestBody FamilyDto familyDto, @PathVariable Integer id) {
		Family family = familyService.find(familyDto.getId());
		MasRelationType masRelationType = masRelationService.findById(familyDto.getMasRelationTypeId());
		
		family.setId(familyDto.getId());
		family.setAddress(familyDto.getAddress());
		family.setFamilyName(familyDto.getFamilyName());
		family.setOccupation(familyDto.getOccupation());
		family.setPosition(familyDto.getPosition());
		family.setAge(familyDto.getAge());
		family.setGender(familyDto.getGender());
		family.setMobile(familyDto.getMobile());
		family.setMasRelationType(masRelationType);
		
		familyService.update(family);
		
		return familyDto;
	}
	
	@RequestMapping(value = "/updateEducations/{id}", method = { RequestMethod.POST })
	public @ResponseBody EducationDto updateEducations(@RequestBody EducationDto educationDto, @PathVariable Integer id) {
		Education education = educationService.findById(educationDto.getId());
		MasDegreeType masDegreeType = masDegreeTypeService.findById(educationDto.getMasDegreeTypeId());
		
		education.setId(educationDto.getId());
		education.setMasdegreetype(masDegreeType);
		education.setFaculty(educationDto.getFaculty());
		education.setGpa(educationDto.getGpa());
		education.setMajor(educationDto.getMajor());
		education.setUniversity(education.getUniversity());
		education.setStart_date(educationDto.getStart_date());
		education.setGraduated_date(educationDto.getGraduated_date());
		educationService.update(education);
		
		return educationDto;
	}
	
	@RequestMapping(value = "/updateCertificates/{id}", method = { RequestMethod.POST })
	public @ResponseBody CertificationDto updateCertificates(@RequestBody CertificationDto certificationDto, @PathVariable Integer id) {
		Certification certification = certificationService.findById(certificationDto.getId());
		System.out.println(certification+"=======test======");
		certification.setId(certificationDto.getId());
		certification.setCertificationForm(certificationDto.getCertificationForm());
		certification.setName(certificationDto.getName());
		certification.setDescription(certificationDto.getDescription());
		certification.setYear(certificationDto.getYear());
		
		certificationService.update(certification);
		
		return certificationDto;
	}
	
	@RequestMapping(value = "/updateSkills/{id}", method = { RequestMethod.POST })
	public @ResponseBody AbilityDto updateSkills(@RequestBody AbilityDto abilityDto, @PathVariable Integer id) {
		Ability skill = abilityService.find(abilityDto.getId());
		MasSpecialty masSpecialty=masSpecialtyService.findById(abilityDto.getMasspecialtyId());
		skill.setId(abilityDto.getId());
		skill.setRank(abilityDto.getRank());
		skill.setMasspecialty(masSpecialty);
		abilityService.update(skill);
		
		return abilityDto;
	}
	
	@RequestMapping(value = "/updateLanguages/{id}", method = { RequestMethod.POST })
	public @ResponseBody LanguageDto updateLanguage(@RequestBody LanguageDto languageDto, @PathVariable Integer id) {
		Language languages = languageService.find(languageDto.getId());
		languages.setId(languageDto.getId());
		languages.setNameLanguage(languageDto.getNameLanguage());
		languages.setReading(languageDto.getReading());
		languages.setSpeaking(languageDto.getSpeaking());
		languages.setUnderstanding(languageDto.getUnderstanding());
		languages.setWriting(languageDto.getWriting());
		languageService.update(languages);
		
		return languageDto;
	}
	
	@RequestMapping(value = "/updateReferences/{id}", method = { RequestMethod.POST })
	public @ResponseBody ReferenceDto updateReferences(@RequestBody ReferenceDto referenceDto, @PathVariable Integer id) {
		Reference reference = referenceService.findById(referenceDto.getId());
		reference.setId(referenceDto.getId());
		reference.setAddress(referenceDto.getAddress());
		reference.setName(referenceDto.getName());
		reference.setOccupation(referenceDto.getOccupation());
		reference.setTel(referenceDto.getTel());
		
		referenceService.update(reference);
		
		return referenceDto;
	}
	
	@RequestMapping(value = "/updateExperience/{id}", method = { RequestMethod.POST })
	public @ResponseBody ExperienceDto updateExperience(@RequestBody ExperienceDto experienceDto, @PathVariable Integer id) throws Exception{
		Experience experience = experienceService.findById(experienceDto.getId());
		experience.setId(experienceDto.getId());
		experience.setAddress(experienceDto.getAddress());
		experience.setReference(experienceDto.getReference());
		experience.setPosition(experienceDto.getPosition());
		experience.setReason(experienceDto.getReason());
		experience.setSalary(experienceDto.getSalary());
		experience.setTypeOfBusiness(experienceDto.getTypeOfBusiness());
		experience.setCompanyName(experienceDto.getCompanyName());
		experience.setDateFrom(experienceDto.getDateFrom());
		experience.setDateTo(experienceDto.getDateTo());
		experience.setResponsibility(experienceDto.getResponsibility());
		
		experienceService.update(experience);
			
		return experienceDto;
	}
	
	////////////////// DELETE METHOD /////////////////////
	
	@RequestMapping(value = "/deleteAddress/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteAddress(@PathVariable("id") Integer id) {
		addressService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteFamily/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteFamily(@PathVariable("id") Integer id) {
		familyService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteEducation/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteEducation(@PathVariable("id") Integer id) {
		educationService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteCertificate/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteCertificate(@PathVariable("id") Integer id) {
		certificationService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteSkill/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteSkill(@PathVariable("id") Integer id) {
		abilityService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteLanguages/{id}", method = RequestMethod.POST)
	public @ResponseBody String delesteLanguages(@PathVariable("id") Integer id) {
		languageService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteReference/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteReference(@PathVariable("id") Integer id) {
		referenceService.deleteById(id);
		return "success";
	}
	
	@RequestMapping(value = "/deleteExperience/{id}", method = RequestMethod.POST)
	public @ResponseBody String deleteExperience(@PathVariable("id") Integer id) {
		experienceService.deleteById(id);
		return "success";
	}

	@ModelAttribute("applicant")
	public ApplicantDto applicant() {
		return new ApplicantDto();
	}
	
	@ModelAttribute("jobLevels")
	public List<MasJobLevel> jobLevelList(){
		return masJoblevelService.findAll();
	}
	
	@ModelAttribute("checktags")
	public List<JoblevelDto> tagList(){
		return applicantService.checkTag("t");
	}
	
	
	@ModelAttribute("technologies")
	public List<MasTechnology> technologyList(){
		return masTechnologyService.findAll();
	}
	
	@ModelAttribute("addresses")
	public List<MasAddressType> addressList(){
		return masAddressTypeService.findAll();
	}
	
	@ModelAttribute("provinces")
	public List<MasProvince> provinceList(){
		return masProvinceService.findAll();
	}
	
	@ModelAttribute("relations")
	public List<MasRelationType> relationList(){
		return masRelationService.findAll();
	}
	
	@ModelAttribute("degreeTypes")
	public List<MasDegreeType> degreeTypesList(){
		return masDegreeTypeService.findAll();
	}
	
	@ModelAttribute("masspecialties")
	public List<MasSpecialty> masspecialtyList(){
		return masSpecialtyService.findAll();
	}
	
	@ModelAttribute("augRequests")
	public List<AugRequestDto> augRequestList(){
		return augRequestService.getJobcaseCode();
	}

}
