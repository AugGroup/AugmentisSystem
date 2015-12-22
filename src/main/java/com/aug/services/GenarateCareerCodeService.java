package com.aug.services;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.aug.hrdb.entities.CareerCase;
import com.aug.hrdb.entities.MasDivision;
import com.aug.hrdb.services.MasDivisionService;

@Transactional
@Service(value="genarateCareerCodeService")
public class GenarateCareerCodeService {

	@Autowired
	private SessionFactory sessionFactory;
	
	@Autowired
	private MasDivisionService masDivisionService;
	
	@RequestMapping(value="/api/careercases/generatecode", method={RequestMethod.GET})
	public String generateCareerCaseCode(MasDivision masDivision) {
		
		System.out.println("-----generateCareerCaseCode-----");
		
		String code = null;
		
		String hql = "FROM CareerCase C WHERE C.masDivision.code = :code ORDER BY C.code DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("code", masDivision.getCode());
		query.setMaxResults(1);
		
		try {
			
			CareerCase careerCase = (CareerCase)query.list().get(0);
			
			System.out.println("Last : " + careerCase.getCode());
			System.out.println("Division: " + masDivision.getCode());
			
			String[] split = careerCase.getCode().split(masDivision.getCode());
			
			int number = Integer.parseInt(split[1]) + 1;
			
			code = masDivision.getCode() + String.format("%04d", number); 
			
			System.out.println("CODE: " + code);
			
		} catch (Exception e) {
			code = masDivision.getCode() + String.format("%04d", 1);
		}
		
		System.out.println("-----------------------------");
		
		return code;
		
	}
	
}
