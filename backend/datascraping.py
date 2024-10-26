import pandas as pd

# Replace 'your_file_path.csv' with the path to your CSV file
df_supplies = pd.read_csv('/Users/anishpai/NewHacks/backend/Corrected_Emergency_Supplies_Checklist_with_Units.csv')
df_shelters = pd.read_csv('/Users/anishpai/NewHacks/backend/Shelter_List_with_County.csv')
df_counties = pd.read_csv('/Users/anishpai/NewHacks/backend/Florida_All_67_Counties_Evacuation_Zones.csv')

# To view the fi