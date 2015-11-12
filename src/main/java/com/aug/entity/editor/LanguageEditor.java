package com.aug.entity.editor;

import java.beans.PropertyEditorSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.aug.hrdb.entities.Language;
import com.aug.hrdb.services.LanguageService;

@Component
public class LanguageEditor extends PropertyEditorSupport{
	
	@Autowired
	private LanguageService languageSkillService;
	
	@Override
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Language rs = languageSkillService.find(Integer.valueOf(text));
			this.setValue(rs);
		}

	}

	@Override
	public String getAsText() {
		String tx = "";
		Language rs = (Language) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}

}
