/**
 *
 * @author Ekkachai.K
 * @date Jan 12, 2015
 */
package com.aug.entity.editor;

import java.beans.PropertyEditorSupport;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.aug.hrdb.entities.Address;
import com.aug.hrdb.services.AddressService;


@Component
public class AddressEditor extends PropertyEditorSupport {
	
	@Autowired
	private AddressService service;
	
	public void setAsText(String text) {
		this.setValue(null);
		if (!"".equals(text)) {
			Address rs = service.findById(Integer.valueOf(text));
			this.setValue(rs);
		}

	}

	public String getAsText() {
		String tx = "";
		Address rs = (Address) this.getValue();
		if (rs != null) {
			tx = Integer.toString(rs.getId());
		}
		return tx;
	}
}
