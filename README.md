# Statistics Visualization Website

A website for visualizing data. At the moment, it supports data for either one or two quantitivate variables. This data can be passed in either directly via a textbox or imported from a file.

## Usage

The Home Page, as of now, gives two options--One Quantitative Variable and Two Quantitative Variables. One Quantitative Variable will analyze data of one variable, while Two Quantitative Variables will analyze the relationship between two given variables.

### File Format

The file should be in a csv format with the first row being column names and the rest being the data itself. You may upload files with abitrary numbers of columnds, as you can specify which columns to use for the analysis.

For example:
```
name,age,cars
john,24,1
kate,38,1
smith,27,3
rodrigo,45,2
...
```

For the above example, to analyze just the `age` column, you would navigate to "One Quantitative Variable", upload the file, enter `age` in the Column Name text field, and click "Upload Data"

To instead analyze the relationship between `age` and `cars`, you would navigate to "Two Quantitative Variables", upload the file, enter `age` in the "Column One Name" text field and `cars` in the "Column Two Name" text field, and click "Upload Data"

## Text Data Format

To input text data, simply input your numerical data, separated by spaces, into the text field(s) in the "Input from text" section. Then click "Upload Data" and the analysis should open.

## Output

Lists of the visualizations and analyses that each page displays.

### One Quantitative Variable

- Basic summary statistics, including mean, median, standard deviation
- Histogram
- Boxplot
- Scatterplot
- Z-score information and conversions
- Percentile information and conversions
- Analysis for normality

### Two Quantitative Variables

- Scatterplot
- Linear regression (least-squares)
- Residual plot
- Correlation information
