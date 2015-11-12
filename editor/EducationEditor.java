/**
 *
 * @author Ekkachai.K
 * @date Jan 12, 2015
 */
package com.aug.hr.entity.editor;

import java.beans.PropertyEditorSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aug.hrdb.entities.Education;
import com.aug.hrdb.services.EducationService;


@Component
public class EducationEditor extends PropertyEditorSupport {
	
	@Autowired
	private EducationService educationService;
	
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Education rs = educationService.findById(Integer.valueOf(text));
			this.setValue(rs);
		}

	}

	public String getAsText() {
		String tx = "";
		Education rs = (Education) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}
}
