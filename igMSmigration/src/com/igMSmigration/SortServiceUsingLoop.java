package com.igMSmigration;

import java.io.IOException;
import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.jar.JarException;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class SortServiceUsingLoop
 */
@WebServlet("/SortServiceUsingLoop")
public class SortServiceUsingLoop extends HttpServlet {
	private static final long serialVersionUID = 1L;
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		String programme = request.getParameter("programme");
		String field = request.getParameter("field");
		String degree = request.getParameter("degree");
		String sortType = request.getParameter("sortType");

		daoCodes dao = new daoCodes();
		dao.connect();

		try {
			JSONArray instiNamesJA = dao.getInstituteJA(programme, field, degree);
			JSONArray detailsJA = dao.getDetailsJA(instiNamesJA, sortType);
			JSONArray instiNamesJASorted = getinstiNamesJASorted(detailsJA);
			JSONArray allDegreeJA = dao.getAllDegreeJA(instiNamesJASorted, programme, field, degree);
			
				response.setContentType("application/json");
				String allJSON = "["+instiNamesJA+","+detailsJA+","+allDegreeJA+"]"; //Put both objects in an array of 2 elements
				response.getWriter().write(allJSON);
		} 
		catch (SQLException e) {e.printStackTrace();} 
		catch (JarException e) {e.printStackTrace();} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
	}

	public JSONArray getinstiNamesJASorted(JSONArray detailsJA) throws JSONException {
		JSONArray sorted = new JSONArray(); 
		for (int i=0; i<detailsJA.length(); i++) {
			JSONObject instituteObject = new JSONObject();
			instituteObject.put("institute", detailsJA.getJSONObject(i).getString("institute").trim());
			sorted.put(i, instituteObject);
		}
		return sorted;
	}
}
