# Data Inventory Search and Filter Features

## Overview
This document describes the search and filter functionality implemented for the Data Inventory dashboard. Users can now search and filter data sources, assets, and flows to quickly find the information they need.

## Features

### Search Functionality
- **Global Search**: A search input field is available in each section (Data Sources, Data Assets, Data Flows)
- **Real-time Filtering**: Results update automatically as the user types
- **Multi-field Search**: Searches across relevant fields for each entity type

### Filter Options
- **Data Sources**: Filter by status (Active, Inactive, Error)
- **Data Assets**: Filter by category (Personal, Financial, Sensitive, Other)
- **Data Flows**: Filter by frequency (Real-time, Hourly, Daily, Weekly, Monthly)

## Implementation Details

### Frontend
- Search input fields added to each section with search icon
- Filter dropdowns with relevant options for each entity type
- State management for search term and filter status using React hooks
- useEffect hooks to trigger data fetching when search/filter criteria change
- useCallback hook to optimize the fetchData function
- Responsive design with Tailwind CSS for all screen sizes

### Backend
- API routes updated to accept search and filter parameters
- Server-side filtering implemented for all entity types
- Search functionality implemented across relevant fields for each entity
- Proper error handling and validation

## API Endpoints

### Data Sources
```
GET /api/data-inventory/sources?organizationId={id}&search={term}&status={status}
```

Search fields: name, type
Filter by: status

### Data Assets
```
GET /api/data-inventory/assets?organizationId={id}&search={term}&category={category}
```

Search fields: name, type
Filter by: category

### Data Flows
```
GET /api/data-inventory/flows?organizationId={id}&search={term}&frequency={frequency}
```

Search fields: purpose, frequency, transfer_method
Filter by: frequency

Additional parameters for flows:
- sourceAssetId: Filter by source asset ID
- destinationAssetId: Filter by destination asset ID

## Usage
1. Navigate to the Data Inventory dashboard
2. Use the search input in any section to filter by keywords
3. Select a filter option from the dropdown to narrow results
4. Results update automatically as you type or change filters

## Recent Improvements

### Performance Optimizations
- Used useCallback hook for fetchData function to prevent unnecessary re-renders
- Fixed useEffect dependency warnings
- Removed duplicate useEffect hooks

### UI/UX Enhancements
- Added FiGitBranch icon for Data Flows section
- Improved responsive design for search and filter controls
- Better layout for search and filter elements on mobile devices

### Code Quality
- Fixed missing icon imports
- Improved code organization and structure
- Added proper error handling

## Future Enhancements
- Add date range filtering
- Implement advanced search with multiple criteria
- Add sorting options
- Include pagination for large result sets
- Add more sophisticated filtering options
