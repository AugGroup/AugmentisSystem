package com.aug.services;

import org.hibernate.Query;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.aug.hrdb.entities.CareerCase;
import com.aug.hrdb.entities.MasDivision;

@Transactional
@Service(value="generateCareerCodeService")
public class GenerateCareerCodeService {

	@Autowired
	private SessionFactory sessionFactory;

	public String generateCareerCaseCode(MasDivision masDivision) {

		System.out.println("-----generateCareerCaseCode-----");

		String code = null;

		String hql = "FROM CareerCase C WHERE C.masDivision.code = :code ORDER BY C.code DESC";
		Query query = sessionFactory.getCurrentSession().createQuery(hql);
		query.setParameter("code", masDivision.getCode());
		query.setMaxResults(1);

		try {

			if (query.list().size() != 0) {
				CareerCase careerCase = (CareerCase)query.list().get(0);

				System.out.println("Last : " + careerCase.getCode());
				System.out.println("Division: " + masDivision.getCode());

				String[] split = careerCase.getCode().split(masDivision.getCode());

				int number = Integer.parseInt(split[1]) + 1;

				code = masDivision.getCode() + String.format("%04d", number);
			} else {
				code = masDivision.getCode() + String.format("%04d", 1);
			}
			System.out.println("CODE: " + code);
		} catch (Exception ex) {
			ex.printStackTrace();
		}

		System.out.println("-----------------------------");

		return code;
	}
	
}
