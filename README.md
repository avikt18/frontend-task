# SQL Query runner [🔗](https://sql-query-insights.netlify.app/)

This is a web-based SQL query runner demo application built using `react`, along with `Tailwindcss` for styling, `antd` for table and `codemirror` for sql editor. It allows users to execute SQL queries in a web-based editor and see the results generated in the form of table.

## Data 
The mock data used in the application is obtained from [graphql-compose-examples](https://github.com/graphql-compose/graphql-compose-examples/tree/master/examples/northwind/data/csv) repo.

## Performance Audit
### 1.Lighthouse report
**FCP - 0.9s** </br>
**LCP - 1.9s** </br>

Below is the screenshot of the lighthouse report of the webapp
![image](https://github.com/avikt18/frontend-task/assets/56340999/59ecdc44-301e-48f4-ae4a-de747a3eca1b)

### 2. GTmetrics
**LCP - 0.59s** </br>
**Full Load Time - 0.81s** </br>
The GTmetrics report can be found [here](https://gtmetrix.com/reports/sql-query-insights.netlify.app/krVjU40s/). Below is the screenshot for the same:
![image](https://github.com/avikt18/frontend-task/assets/56340999/dcdd2cd9-911e-49c9-ac7f-eb27c4bee40b)

## Optimisations
Several optimizations have been done in this React project which are:

1. **Implemented Caching in Data Fetching Hook**: Reduced redundant API calls by caching responses, leading to faster data retrieval and less server load.

2. **Used `useMemo` for Expensive Computations**: Optimized performance by memoizing computationally intensive operations, preventing them from being recalculated on every render.

3. **Applied `useCallback` for Functions**: Stabilized function identities across renders, reducing unnecessary re-renders of child components receiving these functions as props.

4. **Dynamically Imported `antd's Table` Component with React Lazy**: Improved initial page load speed by loading the `Table` component from antd only when needed, effectively reducing the initial JavaScript bundle size.

5. **On-Demand Data Fetching**: The data is only fetched from the API when requested by the user, thus decreasing the initial load times of the app and saving unnecessary API calls.

## App Screenshots
![image](https://github.com/avikt18/frontend-task/assets/56340999/03f4c6fd-6e43-4cbe-825e-3898f700e75e)

![image](https://github.com/avikt18/frontend-task/assets/56340999/847705dd-1448-46a2-becc-3cb9c2dacfb3)

