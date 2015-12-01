package com.aug.resources;

import com.aug.hrdb.dto.ReservationDto;
import com.aug.hrdb.services.ReservationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ReservationResources {

    private Logger LOGGER = LoggerFactory.getLogger(ReservationResources.class);

    @Autowired
    private ReservationService reservationService;

    @RequestMapping(value = "/api/reservations", method = RequestMethod.GET)
    public List<ReservationDto> findAllReservation(
            @RequestParam(value = "start") String start,
            @RequestParam(value = "end") String end,
            @RequestParam(value = "_", required = false) String underscore,
            @RequestParam(value = "timezone", required = false) String timezone) {

        LOGGER.debug("start : " + start + "   end : " + end);

        List<ReservationDto> reservations = reservationService.findByDateRange(start, end);

        LOGGER.debug("total reservations : " + reservations.size());

        return reservations;
    }
    
}
