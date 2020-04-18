package com.igMSmigration;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.jar.JarException;


import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;



public class daoCodes {
	
	Connection con = null;
	QueriesConstants queryConstants = new QueriesConstants();
	
///////////////////////// Establish PostgreSQL Connection ////////////////////////////////////
	public void connect() {
		String url = "jdbc:postgresql://localhost:5432/igDemoDB";
		String username = "postgres";
		String password = "pgAdmin+237";
		
		try {
			Class.forName("org.postgresql.Driver");
			con = DriverManager.getConnection(url, username, password);
		} catch (Exception ex) {
			System.out.println(ex);
		}
	}

///////////////////////// Fetches only institute Name (v2-ongoing) ///////////////////////////
	public JSONArray getInstituteJA(String programme, String field, String degree) throws SQLException, JSONException {
		
			String Query = queryConstants.getInstituteQuery(programme, field, degree);
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(Query);
			JSONArray institutesJA = new JSONArray();
			ResultSetConverter rsc = new ResultSetConverter();
			institutesJA = rsc.convert(rs);
			System.out.println(institutesJA);
			return institutesJA;
		
	}		

///////////////////////// Fetches Basic Details of the Institutes (v2-ongoing) ///////////////
	public JSONArray getDetailsJA(JSONArray instituteName, String sortType) throws JSONException, SQLException {
		
			JSONArray DetailsJA = new JSONArray();
			String Query = queryConstants.getDetailsQueryJA(instituteName, sortType);
			System.out.println(Query);
			Statement st = con.createStatement();
			ResultSet rs = st.executeQuery(Query);
			ResultSetConverter rsc = new ResultSetConverter();
			DetailsJA = rsc.convert(rs);
			System.out.println(DetailsJA);
			return DetailsJA;		
	}

///////////////////////// Fetches in-depth details of the Institutes (v2-ongoing) ////////////
	public JSONArray getAllDegreeJA(JSONArray instiNamesJASorted, String programme, String field, String degree) throws JSONException, SQLException {

		JSONArray allDegreeJA = new JSONArray();  //Final JA of length same as Number of Institutes
		JSONArray allDegreeTempJA = new JSONArray(); //Temp JA by converting rs to JA.
		String Query = queryConstants.getAllDegreeQueryJA(instiNamesJASorted, programme, field, degree);
		System.out.println(Query);
		Statement st = con.createStatement();
		ResultSet rs = st.executeQuery(Query);
		ResultSetConverter rsc = new ResultSetConverter();
		allDegreeTempJA = rsc.convert(rs);
		
		for (int i=0; i<instiNamesJASorted.length(); i++) {
			JSONObject instiDegreeJO = new JSONObject();		//Creates Objects in Final JA of length same as number of Institutes
			allDegreeJA.put(instiDegreeJO);
		}
		
		for (int i=0; i<allDegreeTempJA.length(); i++) {
			for (int j=0; j<instiNamesJASorted.length(); j++) {
				
				JSONObject allDegreeTempJO = allDegreeTempJA.getJSONObject(i);  // points to each object in rs
				String allDegreeTempJAInstituteName = allDegreeTempJO.getString("institute").trim();  
				String instiNamesJASortedInstituteName = instiNamesJASorted.getJSONObject(j).getString("institute").trim();
				if (allDegreeTempJAInstituteName.equals(instiNamesJASortedInstituteName)) {  //  Puts object details into relevant JO
					
					Iterator<String> keysItr = allDegreeTempJO.keys();
					System.out.println(keysItr);
				    while (keysItr.hasNext()) {
						
						String allDegreeTempJOKey = (String) keysItr.next();
						System.out.println(allDegreeTempJOKey);
						String allDegreeTempJOValue = "";
						if (allDegreeTempJOKey.equals("ord")) {
							allDegreeTempJOValue = Integer.toString(allDegreeTempJO.getInt(allDegreeTempJOKey));
						}
						else {
							allDegreeTempJOValue = allDegreeTempJO.getString(allDegreeTempJOKey);
						}
						allDegreeJA.getJSONObject(j).append(allDegreeTempJOKey, allDegreeTempJOValue);
					}
				}
				else continue;

			}
		}
		
		System.out.println(allDegreeJA);
		return allDegreeJA;		
}


}
		
