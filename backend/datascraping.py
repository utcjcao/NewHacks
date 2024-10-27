import pandas as pd

df_supplies = pd.read_csv('/Users/anishpai/NewHacks/backend/Corrected_Emergency_Supplies_Checklist_with_Units.csv')
df_shelters = pd.read_csv('/Users/anishpai/NewHacks/backend/Shelter_List_with_County.csv')
df_counties = pd.read_csv('/Users/anishpai/NewHacks/backend/Florida_All_67_Counties_Evacuation_Zones.csv')

def check_evacuation_info(county):
    """Check if the given county needs to evacuate, return zone and meaning."""
    county_info = df_counties[df_counties['County'] == county]
    
    if not county_info.empty:
        needs_evacuation = county_info['Evacuation Likelihood'].values[0]
        evacuation_zone = county_info['Evacuation Zone'].values[0]
        zone_description = county_info['Zone Description'].values[0]
        
        return needs_evacuation, evacuation_zone, zone_description
    else:
        return "County not found", None, None

def get_adjusted_supplies(num_people, kids=False, pets=False):
    """Adjust supplies based on number of people, and if there are kids or pets."""
    supplies = df_supplies.copy()
    supplies['Total Quantity'] = supplies['Quantity'] * num_people

    if kids:
        supplies.loc[supplies['For'] == 'Per child', 'Total Quantity'] *= 1
    if pets:
        supplies.loc[supplies['For'] == 'Per pet', 'Total Quantity'] *= 1

    return supplies[['Items', 'Total Quantity', 'Units']]


def get_emergency_info(county):
    """Retrieve emergency contact info and distribution centers for the county."""
    county_info = df_counties[df_counties['County'] == county]
    
    if not county_info.empty:
        emergency_website = county_info['Emergency Management Website'].values[0]
        distribution_center = county_info['Distribution Center'].values[0]
        
        return emergency_website, distribution_center
    else:
        return "County emergency information not found", None

def find_nearest_shelter(county, needs_evacuation):
    """Find a shelter in the county or provide a full list if no shelter in the county."""
    shelters_in_county = df_shelters[df_shelters['County'] == county]
    
    if needs_evacuation == 'Yes' and not shelters_in_county.empty:
        return shelters_in_county[['Shelter Name', 'Address']].to_dict(orient="records")
    else:
        return df_shelters[['Shelter Name', 'Address']].to_dict(orient="records")

def prepare_emergency_plan(county, num_people, kids=False, pets=False):
    """Compile all emergency plan details based on inputs."""
    needs_evacuation, evacuation_zone, zone_description = check_evacuation_info(county)
    
    adjusted_supplies = get_adjusted_supplies(num_people, kids, pets)
    
    emergency_website, distribution_center = get_emergency_info(county)
    
    shelters = find_nearest_shelter(county, needs_evacuation)
    
    emergency_plan = {
        "Evacuation Needed": needs_evacuation,
        "Evacuation Zone": evacuation_zone,
        "Zone Description": zone_description,
        "Supplies Checklist": adjusted_supplies,
        "County Website": emergency_website,
        "Distribution Center": distribution_center,
        "Shelters": shelters
    }
    
    return emergency_plan


county_info = "Alachua"
num_people = 3
kids = True
pets = False

emergency_plan = prepare_emergency_plan(county_info, num_people, kids, pets)
print(emergency_plan)

