class Department {
  // name: string;
  // BY ADDING THE 'PRIVATE' KEY, YOU WILL MAKE THE PROPERTY UNACCESIBLE EVEN FOR OTHER CLASSES, WILL ONLY BE BY METHODS
  // BY ADDING THE 'PROTECTED' KEY, YOU WILL MAKE IT ACCESIBLE FOR CLASSES WHICH WILL EXTEND FROM THE BASE CLASS
  protected employees: string[] = []
  // BY USING A STATIC TYPING, WE WILL HAVE TO CALL THE CLASS AND THEN THE STATIC PROPERTY OR FUNCTION IN ORDER TO CALL IT PROPERLY
  static fiscalYear = 2022

  // THE CONSTRUCTOR SETTING MADE HERE IS A SHORTCUT TO AVOID ADDING CLASS PROPERTIES AT FIRST
  // READONLY KEYWORD IS USED WHEN YOU WANT TO ASK FOR INPUT ONLY ONCE, BUT YOU CANNOT CALL IT AGAIN BECAUSE FIRST IS A PRIVATE PROPERTY
  constructor(
    private readonly id: string,
    public name: string,
  ) {}

  /* USING 'THIS' AS AN ARGUMENT OF CLASS TYPE
   * YOU ARE ADDING AN ADDITIONAL TYPE SECURITY CHECK
   * TO AVOID ASSIGNATION ERRORS LIKE LINES 24/25
  */
  describe(this: Department) {
    console.warn('[Classes]', `The department is [${this.id}] ${this.name}`)
  }

  addEmployee(employeeName: string | string[]) {
    this.employees = [...this.employees, ...(Array.isArray(employeeName) ? employeeName : [employeeName])]
  }

  static createNewEmployee(name: string) {
    return { name }
  }
}

class ContractorDepartment extends Department {
  private vendors: string[] = ['american', 'european']

  constructor(id: string, private reports: string[] = []) {
    super(id, 'Contractor')
  }
  
  // YOU USE A GET METHOD TO OBTAIN A PROPERTY DATA WITH ADDITIONAL LOGIC
  get getLastVendor() {
    return this.vendors[this.vendors.length -1]
  }

  addReport(text: string) {
    this.reports = [...this.reports, text]
  }
  
  printReports() {
    console.warn('[Classes]', `The reports are ${this.reports.length > 0 ? this.reports.join(', ') : 'none'}`)
  }

  addEmployee(employeeName: string) {
    if (employeeName === 'Passerino'){
      return
    }

    this.employees.push(employeeName)
  }
}

const newDepartment = new Department('D1', 'Human Resources')

newDepartment.describe()
newDepartment.addEmployee(['Max', 'Anna'])
console.warn('[Classes]', Department.createNewEmployee('Nicolas'))
console.warn('[Classes]', Department.fiscalYear)
console.log('[Classes]', newDepartment)

const inheritanceDepartment = new ContractorDepartment('CD1')

inheritanceDepartment.describe()
inheritanceDepartment.addEmployee('Max')
inheritanceDepartment.addEmployee('Anna')
inheritanceDepartment.addReport('IT')
inheritanceDepartment.addReport('Accounting')
inheritanceDepartment.printReports()
console.info('[Classes]', inheritanceDepartment.getLastVendor)
console.log('[Classes]', inheritanceDepartment)

// CREATING A SHALLOW COPY OF AN OBJECT LIKE THIS WILL NOT CREATE AN ERROR
// UNLESS YOU ADD THE THIS ARGUMENT
// const departmentCopy = { describe: newDepartment.describe }
// departmentCopy.describe()