<div align="center">
    <img alt="logo" width="180" src="src/assets/logo.svg"/>
</div>

<div align="center">
  <h1>GPA Calculator</h1>
</div>

<p align="center">
  A pure front-end GPA calculator that allows users to upload transcripts, calculate GPA, and perform various simulations.
</p>

<div align="center">

![Vue Version](https://img.shields.io/badge/vue-v3.4.15-blue)
![Arco Version](https://img.shields.io/badge/arco-v2.55.1-blue)
![Tailwind Version](https://img.shields.io/badge/tailwind-v3.4.3-blue)
![ExcelJs Version](https://img.shields.io/badge/exceljs-v4.4.0-blue)
![License](https://img.shields.io/github/license/jackieyyang/gpa-calculator)

</div>


<div align="center">

English | [中文](./README.zh-cn.md)

</div>



---

## Main Features

- Upload transcripts and automatically calculate GPA
- View grades for all courses
  - Arithmetic average
  - Weighted average
- Select calculation method
  - Best grades
  - Full process grades
- Add or delete courses to simulate different scenarios
- Provide i18n support for both Chinese and English
- All data is processed on the front end to ensure data security

## Getting Started

1. Download the project to local
   ```
   git clone https://github.com/jackieyyang/gpa-calculator.git
   cd gpa-calculator
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Run the project
   ```
   npm run dev
   ```

4. Upload transcripts
    - Export transcripts from your academic system
    - Select the uploaded transcript button
    - Click Confirm Upload to upload the file
    - Click the small trash can on the right side of the file to clear the record (uploaded files will not be deleted)


5. Use the system function
   - View all courses arithmetic and weighted average grades
      - Best grades
      - Full process grades
   - Simulate different grade situations
      - Add courses
      - Delete courses
   - Restore the original transcript
   - Download the transcript template

## Pay Attention

- All data processing is done on the front end, so there is no need to worry about data security issues.
- Make sure your browser is up-to-date to ensure the best experience.
- If you encounter any problems, please refresh the page or re-upload the transcript.

## Contributing

Submit an issue if you have any questions or suggestions and submit a pull request if you are interested in contributing to this project.

## License

This project is licensed under the [MIT License](LICENSE).