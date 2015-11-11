package com.aug.controllers;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.ResourceBundle;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.jasperreports.engine.JRParameter;

import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.aug.hrdb.services.MasJoblevelService;
import com.aug.services.ReportService;
import com.aug.services.UploadService;
import com.aug.hrdb.services.EmployeeDtoService;
import com.aug.hrdb.services.AimEmployeeDtoService;
import com.aug.hrdb.services.LeaveDtoService;
import com.aug.hrdb.dto.AddressDto;
import com.aug.hrdb.dto.EmployeeDto;
import com.aug.hrdb.dto.EmployeeListDto;
import com.aug.hrdb.dto.ReportEmployeeDto;
import com.aug.hrdb.dto.ReportLeaveDto;
import com.aug.hrdb.dto.ReportStatusEmployeeDto;
import com.aug.hrdb.entities.Address;
import com.aug.hrdb.entities.Applicant;
import com.aug.hrdb.entities.Employee;
import com.aug.hrdb.entities.Leave;
import com.aug.hrdb.services.AddressService;
import com.aug.hrdb.services.EmployeeService;
import com.aug.hrdb.services.MasAddressTypeService;
import com.aug.hrdb.services.MasCoreSkillService;
import com.aug.hrdb.services.MasDivisionService;
import com.aug.hrdb.services.MasEmploymentService;
import com.aug.hrdb.services.MasLocationService;
import com.aug.hrdb.services.MasProvinceService;
import com.aug.hrdb.services.MasStaffTypeService;
import com.aug.hrdb.services.MasTechnologyService;

@Controller
public class EmployeeController {
	@Resource(name = "employeeService")
	@Autowired
	private EmployeeService employeeService;
	@Autowired
	private AddressService addressService;
	@Autowired
	private MasAddressTypeService masAddressTypeService;
	@Autowired
	private MasProvinceService masProvinceService;
	@Autowired
	private MasEmploymentService masEmploymentService;
	@Autowired
	private MasDivisionService masDivisionService;
	@Autowired
	private MasTechnologyService masTechnologyService;
	@Autowired
	private MasCoreSkillService masCoreSkillService;
	@Autowired
	private MasJoblevelService joblevelService;
	@Autowired
	private MasLocationService masLocationService;
	@Autowired
	private MasStaffTypeService masStaffTypeService;
	@Autowired
	private AimEmployeeDtoService aimEmployeeDtoService;
	@Autowired
	private UploadService uploadService;
	@Autowired
	private ReportService reportService;
	@Autowired
	private LeaveDtoService leaveDtoService;
	@Autowired
	private EmployeeDtoService employeeDtoService;

	private static final Logger logger = Logger.getLogger(Employee.class);

	// @RequestMapping(value = "/listemployee", method =
	// {RequestMethod.GET,RequestMethod.POST})
	@RequestMapping(value = "/employee/list", method = { RequestMethod.GET, RequestMethod.POST })
	public String init(ModelMap model) {
		return "listemployee";
	}

	@RequestMapping(value = "/employee", method = { RequestMethod.GET, RequestMethod.POST })
	public String listAll(@ModelAttribute("employeeDto") EmployeeDto employeeDto, HttpSession session, Locale locale,
			ModelMap model) {

		// model.addAttribute("masspecialtyList",masSpecialtyService.findAll());
		// model.addAttribute("masAddressTypeList",masAddressTypeService.findAll());

		model.addAttribute("masAddressTypeList", masAddressTypeService.findAll());
		model.addAttribute("provinceList", masProvinceService.findAll());

		model.addAttribute("employmentList", masEmploymentService.findAll());
		model.addAttribute("divisionList", masDivisionService.findAll());
		model.addAttribute("technologyList", masTechnologyService.findAll());
		model.addAttribute("coreskillList", masCoreSkillService.findAll());
		model.addAttribute("joblevelList", joblevelService.findAll());
		model.addAttribute("locationList", masLocationService.findAll());
		model.addAttribute("staffTypeList", masStaffTypeService.findAll());
		model.addAttribute("aimList", aimEmployeeDtoService.listEmployeeAim());

		return "employee";

	}

	@RequestMapping(value = "/employee/listAll", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody List<EmployeeListDto> listAll() {
		return employeeDtoService.searchEmployee();

	}

	/*
	 * @RequestMapping(value ="/employee/listEmployeeAim", method =
	 * {RequestMethod.GET, RequestMethod.POST}) public @ResponseBody
	 * List<Employee> listEmployeeAim(){ return
	 * (List<Employee>)employeeService.listEmployeeAim(); }
	 */

	// Add
	@RequestMapping(value = "/employee/add", method = RequestMethod.POST)
	public @ResponseBody Employee Add(@RequestBody Employee employee) {
		employeeService.create(employee);
		return employee;
	}

	// findAddress
	@RequestMapping(value = "/employee/address", method = { RequestMethod.POST, RequestMethod.GET })
	public @ResponseBody List<AddressDto> findAddress(@RequestBody AddressDto addressDto,
			@ModelAttribute("employeeDto") EmployeeDto employeeDto, ModelMap model) {

		model.addAttribute("masAddressTypeList", masAddressTypeService.findAll());
		model.addAttribute("provinceList", masProvinceService.findAll());

		addressDto.setApplicantId(addressDto.getApplicantId());

		return addressService.findAddressByApplicantId(addressDto.getApplicantId());
	}

	// Add Address
	@RequestMapping(value = "/employee/addAddress", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody Address AddAddress(@RequestBody Address address) {
		addressService.create(address);
		return address;
	}

	// initedit
	@RequestMapping(value = "/employee/init/{id}", method = RequestMethod.GET)
	public String initEditEmployee(@PathVariable("id") Integer empId,
			@ModelAttribute("employeeDto") EmployeeDto employeeDto, Model model) {

		model.addAttribute("myDate", new Date());

		System.out.println("date: " + employeeDto.getDateOfBirth());

		employeeDto = employeeService.findEmployeeByEmployeeIdWithSetToDto(empId);

		model.addAttribute("masAddressTypeList", masAddressTypeService.findAll());
		model.addAttribute("provinceList", masProvinceService.findAll());

		model.addAttribute("employmentList", masEmploymentService.findAll());
		model.addAttribute("divisionList", masDivisionService.findAll());
		model.addAttribute("technologyList", masTechnologyService.findAll());
		model.addAttribute("coreskillList", masCoreSkillService.findAll());
		model.addAttribute("joblevelList", joblevelService.findAll());
		model.addAttribute("locationList", masLocationService.findAll());
		model.addAttribute("staffTypeList", masStaffTypeService.findAll());
		model.addAttribute("aimList", aimEmployeeDtoService.listEmployeeAimForUpdate(empId));
		model.addAttribute("employeeDto", employeeDto);

		new SimpleDateFormat("dd-MMM-yyyy").format(employeeDto.getDateOfBirth());
		System.out.println("date: " + employeeDto.getDateOfBirth());

		Employee employee = employeeService.findById(empId);
		model.addAttribute("appId", employee.getApplicant().getId());

		return "employee";
	}

	// InitEdit
	// @RequestMapping(value = "/employee/initEdit/{empId}", method = {
	// RequestMethod.GET, RequestMethod.POST })
	// @Transactional
	// public @ResponseBody Employee initEditEmployee(@PathVariable("empId")
	// Integer empId, Model model) {
	// Employee employee = employeeService.findById(empId);
	//
	//
	// model.addAttribute("asdfaf",new Employee());
	//
	// Employee user = new Employee();
	//
	// user.setId(employee.getId());
	// user.setName(employee.getName());
	//
	// return employee;
	// }

	// edit
	@RequestMapping(value = "/employee/edit", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody Employee editEmployee(@RequestBody Employee emp) {
		employeeService.update(emp);
		return emp;
	}

	@RequestMapping(value = "/employee/findById", method = RequestMethod.POST)
	public @ResponseBody Address findById(@RequestParam Integer id) {
		return addressService.find(id);
	}

	// editAddress
	@RequestMapping(value = "/employee/editAddress", method = RequestMethod.POST)
	public @ResponseBody Address editAddress(@RequestBody Address addres) {
		addressService.update(addres);
		return addres;
	}

	// delete
	@RequestMapping(value = "/employee/delete/{empId}", method = RequestMethod.POST)
	public @ResponseBody String deleteEmployee(@PathVariable("empId") Integer empId) {
		employeeService.deleteById(empId);
		return "{success:true}";
	}

	@RequestMapping(value = "/employee/finduniqueidcard", method = RequestMethod.POST)
	public @ResponseBody List<EmployeeListDto> findUniqueIdCard(@RequestBody EmployeeListDto employeeListDto,
			Locale locale, ModelMap model) {

		List<EmployeeListDto> employeeList = employeeDtoService.searchEmpForUniqueIdCard(employeeListDto.getId(),
				employeeListDto.getCardId());
		return employeeList;

	}

	@RequestMapping(value = "/employee/submit", method = RequestMethod.POST)
	public String manageSubmit(@ModelAttribute EmployeeDto employeeDto, Model model,
			final RedirectAttributes redirectAttributes, HttpServletRequest request, HttpServletResponse response)
					throws IOException, Exception {

		logger.info("infoooo: " + employeeDto);
		logger.info("infoooo: ================================================================>"
				+ employeeDto.getAimempid());

		Employee employee = new Employee();
		String employeeCode = null;
		Employee employee1;
		String[] result1;
		String img = null;

		System.out.println("locations: " + employeeDto.getMasLocation());

		/*
		 * if (employeeDto.getId() == null) {
		 * 
		 * logger.info("create employee");
		 * 
		 * try { if (employeeDto.getFileupload().getOriginalFilename() == null
		 * || employeeDto.getFileupload().getOriginalFilename().isEmpty() ==
		 * true) {
		 * 
		 * try { employeeCode =
		 * employeeService.generateEmployeeCode(employeeDto); employee =
		 * employeeService.createEmployeeAndReturnId(employeeDto, employeeCode);
		 * } catch (JDBCException je) {
		 * 
		 * System.out.println("jdbce " + je.getErrorCode()); try { employeeCode
		 * = employeeService.generateEmployeeCode(employeeDto); employee =
		 * employeeService.createEmployeeAndReturnId(employeeDto, employeeCode);
		 * } catch (JDBCException jdbce) {
		 * 
		 * redirectAttributes.addFlashAttribute("msgerror",
		 * "dupicate employeecode");
		 * 
		 * return "redirect:/employee";
		 * 
		 * }
		 * 
		 * }
		 * 
		 * return "redirect:/employee/init/" + employee.getId();
		 * 
		 * } else if (employeeDto.getFileupload().getOriginalFilename() != null
		 * || employeeDto.getFileupload().getOriginalFilename().isEmpty() ==
		 * false) { String[] result =
		 * StringUtils.split(employeeDto.getFileupload().getOriginalFilename(),
		 * '.'); logger.info("length: " + result.length);
		 * 
		 * if (result.length == 2) {
		 * 
		 * logger.info("length: " + result.length);
		 * 
		 * try { employeeCode =
		 * employeeService.generateEmployeeCode(employeeDto);
		 * employeeDto.setImage(employeeCode + "." + result[1]); employee =
		 * employeeService.createEmployeeAndReturnId(employeeDto, employeeCode);
		 * } catch (JDBCException jdbce) {
		 * 
		 * try { employeeCode =
		 * employeeService.generateEmployeeCode(employeeDto);
		 * employeeDto.setImage(employeeCode + "." + result[1]); employee =
		 * employeeService.createEmployeeAndReturnId(employeeDto, employeeCode);
		 * } catch (JDBCException je) {
		 * 
		 * redirectAttributes.addFlashAttribute("msgerror",
		 * "dupicate employeecode");
		 * 
		 * return "redirect:/employee";
		 * 
		 * }
		 * 
		 * }
		 * 
		 * if (employee.getId() != null) {
		 * 
		 * uploadService.uploadImage("EMPLOYEE", employeeCode + "." + result[1],
		 * employeeDto.getFileupload());
		 * 
		 * }
		 * 
		 * } if (result.length == 0) {
		 * 
		 * try { employeeCode =
		 * employeeService.generateEmployeeCode(employeeDto); employee =
		 * employeeService.createEmployeeAndReturnId(employeeDto, employeeCode);
		 * 
		 * } catch (JDBCException jdbce) { try { employeeCode =
		 * employeeService.generateEmployeeCode(employeeDto); employee =
		 * employeeService.createEmployeeAndReturnId(employeeDto, employeeCode);
		 * } catch (JDBCException je) {
		 * 
		 * redirectAttributes.addFlashAttribute("msgerror",
		 * "dupicate employeecode");
		 * 
		 * return "redirect:/employee";
		 * 
		 * }
		 * 
		 * }
		 * 
		 * }
		 * 
		 * return "redirect:/employee/init/" + employee.getId();
		 * 
		 * }
		 * 
		 * } catch (IOException e) {
		 * 
		 * throw new IOException();
		 * 
		 * } catch (Exception e) {
		 * 
		 * throw new Exception(); }
		 * 
		 * } else
		 */

		if (employeeDto.getId() > 0) {

			logger.info("update emp");
			employee1 = employeeService.findById(employeeDto.getId());

			try {

				if (employeeDto.getEmployeeCode() == null || employeeDto.getEmployeeCode().isEmpty() == true) {

					employeeCode = employeeService.generateEmployeeCode(employeeDto);

					if (employeeDto.getFileupload().getOriginalFilename() == null) {
						if (employee1.getApplicant().getImage() == null
								|| employee1.getApplicant().getImage().equals("")) {

							img = null;

						} else if (employee1.getApplicant().getImage() != null
								|| employee1.getApplicant().getImage().equals("") == false) {

							img = employee1.getApplicant().getImage();

						}

					} else if (employeeDto.getFileupload().getOriginalFilename() != null) {

						result1 = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

						if (result1.length == 2) {

							if (employee1.getApplicant().getImage() == null) {

								img = employeeCode + "." + result1[1];

							} else if (employee1.getApplicant().getImage() != null) {

								img = employeeCode + "." + result1[1];

							}

						}
					}

					employee = employeeService.updateEmployeeAndReturnId(employeeDto, employeeCode, img);

					if (employeeDto.getFileupload().getOriginalFilename() != null) {

						System.out.println("img name: " + employeeDto.getImage());
						System.out.println("original file name: " + employeeDto.getFileupload().getOriginalFilename());
						String[] result = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

						if (result.length == 2) {

							if (employee1.getApplicant().getImage() == null) {

								// upload file
								try {
									uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
											employeeDto.getFileupload());

								} catch (RuntimeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}

							} else if (employee1.getApplicant().getImage() != null) {

								// delete file upload

								try {
									uploadService.delete("EMPLOYEE", employee1.getApplicant().getImage());
								} catch (RuntimeException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								} catch (IOException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}

								// upload file
								try {
									uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
											employeeDto.getFileupload());

								} catch (RuntimeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}

							}

						}

					}

				} else if (employeeDto.getEmployeeCode() != null || employeeDto.getEmployeeCode().isEmpty() == false) {

					employeeCode = employeeDto.getEmployeeCode();

					if (employeeDto.getFileupload().getOriginalFilename() == null) {
						if (employee1.getApplicant().getImage() == null
								|| employee1.getApplicant().getImage().equals("")) {

							img = null;

						} else if (employee1.getApplicant().getImage() != null
								|| employee1.getApplicant().getImage().equals("") == false) {

							img = employee1.getApplicant().getImage();

						}

					} else if (employeeDto.getFileupload().getOriginalFilename() != null) {

						result1 = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

						if (result1.length == 2) {

							if (employee1.getApplicant().getImage() == null) {

								img = employeeCode + "." + result1[1];

							} else if (employee1.getApplicant().getImage() != null) {

								img = employeeCode + "." + result1[1];

							}
						}
					}

					employee = employeeService.updateEmployeeAndReturnId(employeeDto, employeeCode, img);

					if (employeeDto.getFileupload().getOriginalFilename() == null) {
						if (employee1.getApplicant().getImage() == null
								|| employee1.getApplicant().getImage().equals("")) {

							img = null;

						} else if (employee1.getApplicant().getImage() != null
								|| employee1.getApplicant().getImage().equals("") == false) {

							img = employee1.getApplicant().getImage();

						}

					} else if (employeeDto.getFileupload().getOriginalFilename() != null) {

						result1 = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

						if (result1.length == 2) {

							if (employee1.getApplicant().getImage() == null) {

								img = employeeCode + "." + result1[1];

							} else if (employee1.getApplicant().getImage() != null) {

								img = employeeCode + "." + result1[1];

							}

						}
					}

					if (employeeDto.getFileupload().getOriginalFilename() != null) {

						System.out.println("img name: " + employeeDto.getImage());
						System.out.println("original file name: " + employeeDto.getFileupload().getOriginalFilename());
						String[] result = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

						if (result.length == 2) {

							if (employee1.getApplicant().getImage() == null) {

								// upload file
								try {
									uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
											employeeDto.getFileupload());

								} catch (RuntimeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}

							} else if (employee1.getApplicant().getImage() != null) {

								// delete file upload

								try {
									uploadService.delete("EMPLOYEE", employee1.getApplicant().getImage());
								} catch (RuntimeException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								} catch (IOException e1) {
									// TODO Auto-generated catch block
									e1.printStackTrace();
								}

								// upload file
								try {
									uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
											employeeDto.getFileupload());

								} catch (RuntimeException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								} catch (IOException e) {
									// TODO Auto-generated catch block
									e.printStackTrace();
								}

							}

						}

					}
				}

			} catch (DataIntegrityViolationException jdbce) {
				try {
					if (employeeDto.getEmployeeCode() == null || employeeDto.getEmployeeCode().isEmpty() == true) {

						employeeCode = employeeService.generateEmployeeCode(employeeDto);

						if (employeeDto.getFileupload().getOriginalFilename() == null) {
							if (employee1.getApplicant().getImage() == null
									|| employee1.getApplicant().getImage().equals("")) {

								img = null;

							} else if (employee1.getApplicant().getImage() != null
									|| employee1.getApplicant().getImage().equals("") == false) {

								img = employee1.getApplicant().getImage();

							}

						} else if (employeeDto.getFileupload().getOriginalFilename() != null) {

							result1 = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

							if (result1.length == 2) {

								if (employee1.getApplicant().getImage() == null) {

									img = employeeCode + "." + result1[1];

								} else if (employee1.getApplicant().getImage() != null) {

									img = employeeCode + "." + result1[1];

								}

							}
						}

						employee = employeeService.updateEmployeeAndReturnId(employeeDto, employeeCode, img);

						if (employeeDto.getFileupload().getOriginalFilename() != null) {

							System.out.println("img name: " + employeeDto.getImage());
							System.out.println(
									"original file name: " + employeeDto.getFileupload().getOriginalFilename());
							String[] result = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

							if (result.length == 2) {

								if (employee1.getApplicant().getImage() == null) {

									// upload file
									try {
										uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
												employeeDto.getFileupload());

									} catch (RuntimeException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}

								} else if (employee1.getApplicant().getImage() != null) {

									// delete file upload

									try {
										uploadService.delete("EMPLOYEE", employee1.getApplicant().getImage());
									} catch (RuntimeException e1) {
										// TODO Auto-generated catch block
										e1.printStackTrace();
									} catch (IOException e1) {
										// TODO Auto-generated catch block
										e1.printStackTrace();
									}

									// upload file
									try {
										uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
												employeeDto.getFileupload());

									} catch (RuntimeException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}

								}

							}

						}

					} else
						if (employeeDto.getEmployeeCode() != null || employeeDto.getEmployeeCode().isEmpty() == false) {

						employeeCode = employeeDto.getEmployeeCode();

						if (employeeDto.getFileupload().getOriginalFilename() == null) {
							if (employee1.getApplicant().getImage() == null
									|| employee1.getApplicant().getImage().equals("")) {

								img = null;

							} else if (employee1.getApplicant().getImage() != null
									|| employee1.getApplicant().getImage().equals("") == false) {

								img = employee1.getApplicant().getImage();

							}

						} else if (employeeDto.getFileupload().getOriginalFilename() != null) {

							result1 = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

							if (result1.length == 2) {

								if (employee1.getApplicant().getImage() == null) {

									img = employeeCode + "." + result1[1];

								} else if (employee1.getApplicant().getImage() != null) {

									img = employeeCode + "." + result1[1];

								}

							}
						}

						employee = employeeService.updateEmployeeAndReturnId(employeeDto, employeeCode, img);

						if (employeeDto.getFileupload().getOriginalFilename() != null) {

							System.out.println("img name: " + employeeDto.getImage());
							System.out.println(
									"original file name: " + employeeDto.getFileupload().getOriginalFilename());
							String[] result = StringUtils.split(employeeDto.getFileupload().getOriginalFilename(), '.');

							if (result.length == 2) {

								if (employee1.getApplicant().getImage() == null) {

									// upload file
									try {
										uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
												employeeDto.getFileupload());

									} catch (RuntimeException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}

								} else if (employee1.getApplicant().getImage() != null) {

									// delete file upload

									try {
										uploadService.delete("EMPLOYEE", employee1.getApplicant().getImage());
									} catch (RuntimeException e1) {
										// TODO Auto-generated catch block
										e1.printStackTrace();
									} catch (IOException e1) {
										// TODO Auto-generated catch block
										e1.printStackTrace();
									}

									// upload file
									try {
										uploadService.upload("EMPLOYEE", employeeCode + "." + result[1],
												employeeDto.getFileupload());

									} catch (RuntimeException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									} catch (IOException e) {
										// TODO Auto-generated catch block
										e.printStackTrace();
									}

								}

							}

						}

					}
				} catch (DataIntegrityViolationException je) {

					redirectAttributes.addFlashAttribute("msgerror", "dupicate employeecode");
					return "redirect:/listemployee";

				}

			}

		}

		return "redirect:/listemployee";
	}

	@RequestMapping(value = "/employee/deleteemp/{id}", method = RequestMethod.POST)
	public String deleteEmployeeAndRelateTable(@PathVariable("id") Integer id) throws Exception {

		Employee employee = new Employee();
		employee = employeeService.findAndinitializeOfficial(id);

		List<Employee> aimList = employeeService.findAimRelateWithEmployee(employee.getId());
		if (aimList != null || aimList.isEmpty() == false) {

			for (Employee aim : aimList) {

				if (aim.getId() != null) {
					System.out.println("not null aim");
					aim = employeeService.findById(aim.getId());
					aim.setAimempid(null);
					System.out.println("id: " + aim.getId());
					employeeService.update(aim);

				}

			}

		}

		employee = employeeService.findAndinitializeOfficial(id);

		if (employee.getApplicant().getImage() != null) {
			try {
				uploadService.delete("EMPLOYEE", employee.getApplicant().getImage());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				throw new Exception();
			}
		}

		employeeService.deleteEmployeeByHibernate(employee);
		return "redirect:/listemployee";

	}

	// Report
	@RequestMapping(value = "/employee/reportPopup", method = { RequestMethod.GET })
	public String reportPopup(@ModelAttribute(value = "employee") ReportEmployeeDto reportEmployeeDto, Locale locale,
			ModelMap map) {
		return "/employee/reportPopup";
	}

	@RequestMapping(value = "/employee/reportEmpName", method = { RequestMethod.GET, RequestMethod.POST })
	public String reportEmpName(ModelMap map) {
		return "/report/reportEmpName";
	}

	@RequestMapping(value = "/employee/reportEmpCode", method = { RequestMethod.GET, RequestMethod.POST })
	public String modalReportEmpCode(ModelMap map) {
		return "/report/reportEmpCode";
	}

	@RequestMapping(value = "/employee/searchReportEmpName", method = { RequestMethod.POST, RequestMethod.GET })
	public ModelAndView searchEmployeeNameReport(@ModelAttribute(value = "employee") Employee employee, ModelMap map,
			HttpSession session, Locale locale) {

		List<ReportEmployeeDto> employeeList;
		// map กับ name แทน nameeng
		String searchText = employee.getName();
		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportEmployee(searchText);
		} else {
			employeeList = employeeDtoService.reportEmployee(searchText);
		}
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
		parameterMap.put(JRParameter.REPORT_RESOURCE_BUNDLE, bundle);
		ModelAndView mv = reportService.getReport(employeeList, "employeeReport", employee.getReportType(),
				parameterMap);
		return mv;
	}

	@RequestMapping(value = "/employee/searchReportEmpCode", method = { RequestMethod.POST, RequestMethod.GET })
	public ModelAndView searchEmployeeCodeReport(@ModelAttribute(value = "employee") Employee employee, ModelMap map,
			HttpSession session, Locale locale) {
		List<ReportEmployeeDto> employeeList;
		String searchText = employee.getName();

		// System.out.println("searchText: "+employee.getName());

		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportEmployeeCode(searchText);
		} else {
			employeeList = employeeDtoService.reportEmployeeCode(searchText);
		}
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
		parameterMap.put(JRParameter.REPORT_RESOURCE_BUNDLE, bundle);
		ModelAndView mv = reportService.getReport(employeeList, "employeeCodeReport", employee.getReportType(),
				parameterMap);
		return mv;
	}

	@RequestMapping(value = "/employee/searchNameCode/{searchText}", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody List<ReportEmployeeDto> searchNameCode(@PathVariable("searchText") String searchText,
			@ModelAttribute(value = "employee") Employee employee, ModelMap map, HttpSession session, Locale locale) {
		List<ReportEmployeeDto> employeeList;
		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportEmployee("");
		} else {
			employeeList = employeeDtoService.reportEmployee(searchText);
		}
		return employeeList;
	}

	// ----------------------------------------EMP
	// STATUS----------------------------------------------------------------

	@RequestMapping(value = "/employee/ReportStatusEmp", method = RequestMethod.GET)
	public String ReportStatusEmp(ModelMap map) {
		return "/report/reportStatusEmp";
	}

	@RequestMapping(value = "/employee/searchEmpStatusReport", method = { RequestMethod.POST, RequestMethod.GET })
	public ModelAndView searchEmpStatusReport(@ModelAttribute(value = "employee") Employee employee, ModelMap map,
			HttpSession session, Locale locale) {
		List<ReportStatusEmployeeDto> employeeList;
		String searchText = employee.getMasStaffType().getName();
		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportStatusEmployee(searchText);
		} else {
			employeeList = employeeDtoService.reportStatusEmployee(searchText);
		}
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
		parameterMap.put(JRParameter.REPORT_RESOURCE_BUNDLE, bundle);
		ModelAndView mv = reportService.getReport(employeeList, "reportStatusEmp", employee.getReportType(),
				parameterMap);
		return mv;

	}

	@RequestMapping(value = "/employee/searchEmpStatusByStatus/{searchText}", method = { RequestMethod.GET,
			RequestMethod.POST })
	public @ResponseBody List<ReportStatusEmployeeDto> searchNameStatusEmp(
			@PathVariable("searchText") String searchText, @ModelAttribute(value = "employee") Employee employee,
			ModelMap map, HttpSession session, Locale locale) {
		List<ReportStatusEmployeeDto> employeeList;
		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportStatusEmployee("");
		} else {
			employeeList = employeeDtoService.reportStatusEmployee(searchText);
		}
		// System.out.print("==============================================================
		// "+searchText);
		return employeeList;
	}

	// ------------------------------------------------------------------------------------------------------------------------------------

	@RequestMapping(value = "/employee/ReportLeave", method = { RequestMethod.GET, RequestMethod.POST })
	public String modalReportLeave(ModelMap map) {
		return "/report/reportEmpLeave";
	}

	@RequestMapping(value = "/employee/searchReportEmpLeave", method = { RequestMethod.GET, RequestMethod.POST })
	public ModelAndView searchLeaveReport(@ModelAttribute(value = "applicant") Applicant applicant, ModelMap map,
			HttpSession session, Locale locale) {
		// List<ReportLeaveDto> leaveList = employeeDtoService.reportLeave();
		List<ReportLeaveDto> employeeList;
		// String searchText = employee.getNameEng();
		// map กับ name แทน nameeng
		/**********************************************/
		String searchText = applicant.getFirstNameEN();
		if (searchText.equals("forEmptySearch")) {
			employeeList = leaveDtoService.reportLeave(searchText);
		} else {
			employeeList = leaveDtoService.reportLeave(searchText);
		}
		Map<String, Object> parameterMap = new HashMap<String, Object>();
		ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
		parameterMap.put(JRParameter.REPORT_RESOURCE_BUNDLE, bundle);
		ModelAndView mv = reportService.getReport(employeeList, "leaveReport1", applicant.getReportType(),
				parameterMap);
		return mv;
	}

	@RequestMapping(value = "/employee/searchName/{searchText}", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody List<ReportEmployeeDto> searchName(@PathVariable("searchText") String searchText,
			@ModelAttribute(value = "applicant") Applicant applicant, ModelMap map, HttpSession session,
			Locale locale) {
		List<ReportEmployeeDto> employeeList;
		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportEmployee("");
		} else {
			employeeList = employeeDtoService.reportEmployee(searchText);
		}
		// System.out.print("==============================================================
		// "+searchText);
		return employeeList;
	}

	@RequestMapping(value = "/employee/searchCode/{searchText}", method = { RequestMethod.GET, RequestMethod.POST })
	public @ResponseBody List<ReportEmployeeDto> searchCode(@PathVariable("searchText") String searchText,
			@ModelAttribute(value = "employee") Employee employee, ModelMap map, HttpSession session, Locale locale) {
		List<ReportEmployeeDto> employeeList;
		if (searchText.equals("forEmptySearch")) {
			employeeList = employeeDtoService.reportEmployeeCode("");
		} else {
			employeeList = employeeDtoService.reportEmployeeCode(searchText);
		}
		return employeeList;
	}

	@RequestMapping(value = "/employee/searchNameLeave/{searchText}", method = { RequestMethod.GET,
			RequestMethod.POST })
	public @ResponseBody List<ReportLeaveDto> searchNameLeave(@PathVariable("searchText") String searchText,
			@ModelAttribute(value = "leave") Leave leave, ModelMap map, HttpSession session, Locale locale) {
		List<ReportLeaveDto> employeeLeaveList;
		if (searchText.equals("forEmptySearch")) {
			employeeLeaveList = leaveDtoService.reportLeave("");
		} else {
			employeeLeaveList = leaveDtoService.reportLeave(searchText);
		}
		// System.out.print("==============================================================
		// "+searchText);
		return employeeLeaveList;
	}

	@ModelAttribute("employee")
	Employee setupForm() {
		return new Employee();
	}

	@ModelAttribute("applicant")
	Applicant setupApplicant() {
		return new Applicant();
	}

}
