package com.igMSmigration;

import java.util.ArrayList;
import java.util.jar.JarException;

import org.json.JSONArray;
import org.json.JSONException;

public class QueriesConstants {
	
	public String getInstituteQuery (String programme, String field, String degree ) {
		String Query = "";
		if (programme.equals("All") && field.equals("All")) {
			Query = "SELECT \"institute\" FROM public.institutes WHERE \"institute\"='IIT Bombay' OR \"institute\"='IIT Delhi' OR \"institute\"='IIT Gandhinagar';" ;
		}
		else if (!programme.equals("All") && field.equals("All") && degree.equals("All")) { 
			Query = " SELECT DISTINCT institute FROM public.\"IIT Bombay\" WHERE programme= '" + programme + "' "
			+ "UNION "
			+ "SELECT institute	FROM public.\"IIT Gandhinagar\" WHERE programme= '" + programme + "' "
			+ "UNION "
			+ "SELECT institute	FROM public.\"IIT Delhi\" WHERE programme= '" + programme + "' "
			+ ";";
			}
		else if (!programme.equals("All") && field.equals("All") && !degree.equals("All")) {
			Query = " SELECT DISTINCT institute FROM public.\"IIT Bombay\" WHERE programme= '" + programme + "' AND \""+degree+"\" IS NOT NULL "
			+ "UNION "
			+ "SELECT institute	FROM public.\"IIT Gandhinagar\" WHERE programme= '" + programme + "' AND \""+degree+"\" IS NOT NULL "
			+ "UNION "
			+ "SELECT institute	FROM public.\"IIT Delhi\" WHERE programme= '" + programme + "' AND \""+degree+"\" IS NOT NULL "
			+ ";";
			}
		
		else if (!programme.equals("All") && !field.equals("All") && degree.equals("All")){	
			Query  = "SELECT institute FROM public.\"IIT Bombay\" WHERE programme= '" + programme + "' AND field= '" + field + "' "
			+ "UNION "
			+ "SELECT institute FROM public.\"IIT Gandhinagar\" WHERE programme= '" + programme + "' AND field= '" + field + "' "
			+ "UNION "
			+ "SELECT institute FROM public.\"IIT Delhi\" WHERE programme= '" + programme + "' AND field= '" + field + "' "
			+ ";";
		}
		else if (!programme.equals("All") && !field.equals("All") && !degree.equals("All")){	
			Query  = "SELECT institute FROM public.\"IIT Bombay\" WHERE programme= '" + programme + "' AND field= '" + field + "' AND \""+degree+"\" IS NOT NULL "
			+ "UNION "
			+ "SELECT institute FROM public.\"IIT Gandhinagar\" WHERE programme= '" + programme + "' AND field= '" + field + "' AND \""+degree+"\" IS NOT NULL "
			+ "UNION "
			+ "SELECT institute FROM public.\"IIT Delhi\" WHERE programme= '" + programme + "' AND field= '" + field + "' AND \""+degree+"\" IS NOT NULL "
			+ ";";
		}
		
	return Query;
	}
	
	public String getDetailsQueryJA (JSONArray instiName, String sortType) throws JSONException {
		 String sortText = "";
	     if (sortType.equals("NIRF Overall Ranking")) sortText = "nirf";
		 else if (sortType.equals("A-Z")) sortText = "\"institute\"";
		 else if (sortType.equals("Fees (Low to High)")) sortText = "fees";

		String Query = "SELECT \"institute\", fees, location, \"homeLink\", \"imageLocation\" FROM public.institutes WHERE ";
		for (int i = 0; i<instiName.length()-1; i++) {
			Query = Query.concat("\"institute\" = '" + instiName.getJSONObject(i).getString("institute").trim() + "' OR ");
		}
		 	Query = Query.concat("\"institute\" = '" + instiName.getJSONObject(instiName.length()-1).getString("institute").trim() + "' ORDER BY " + sortText + ";");
		return Query;
	}

	public String getAllDegreeQueryJA (JSONArray instiName, String programme, String field, String degree) throws JSONException {
		String Query = "";
		String everything = " institute, programme, field, \"deptWebsite\", \"M.A\", \"M.B.A\", \"M.Des\", \"M.Sc\", \"M.Tech\", \"M.UDE\", \"M.Phil\", \"MS-R\", \"M.A+P.hD\", \"M.Sc+M.Tech\", \"M.Sc+P.hD\", \"M.Tech+P.hD\", \"PGDIIT\", \"P.hD\" ";
		if (!programme.equals("All") && !field.equals("All") && degree.equals("All")) {
			for (int i = 0; i<instiName.length()-1; i++) {
				Query += "SELECT" + everything + ", " + i + " as ord FROM public.\"" + instiName.getJSONObject(i).getString("institute").trim() + "\" WHERE \"field\"= '" + field + "' ";
				Query += "UNION ";
			}
				Query += "SELECT" + everything + ", " + Integer.toString(instiName.length()-1) + " as ord FROM public.\"" + instiName.getJSONObject(instiName.length()-1).getString("institute").trim() + "\" WHERE \"field\"= '" + field + "' ";
				Query += "ORDER BY ord;";
		}
		else if (!programme.equals("All") && !field.equals("All") && !degree.equals("All")) {		
			for (int i = 0; i<instiName.length()-1; i++) {
				Query += "SELECT" + everything + ", " + i + " as ord FROM public.\"" + instiName.getJSONObject(i).getString("institute").trim() + "\" WHERE \"field\"= '" + field + "' AND \""+degree+"\" IS NOT NULL ";
				Query += "UNION ";
			}
				Query += "SELECT" + everything + ", " + Integer.toString(instiName.length()-1) + " as ord FROM public.\"" + instiName.getJSONObject(instiName.length()-1).getString("institute").trim() + "\" WHERE \"field\"= '" + field + "' AND \""+degree+"\" IS NOT NULL ";
				Query += "ORDER BY ord;";
		}
		else { //for returning empty array purposefully
			Query += "SELECT" + everything + ", 1 as ord FROM public.\"IIT Bombay\" WHERE \"programme\"= 'All' ;";
		}
		return Query;
	}




}

