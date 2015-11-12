/**
 *
 * @author Pranrajit
 * @date 19 พ.ค. 2558
 */
package com.aug.hr.entity.editor;

import java.beans.PropertyEditorSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.aug.hrdb.entities.Ability;
import com.aug.hrdb.services.AbilityService;


@Component
public class AbilityEditor  extends PropertyEditorSupport{

	@Autowired
	private AbilityService abilityService;
	 
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Ability rs = abilityService.find(Integer.valueOf(text));
			this.setValue(rs);
		}

	}

	public String getAsText() {
		String tx = "";
		Ability rs = (Ability) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}
	
	
}
