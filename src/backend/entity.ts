interface IReferido {
  name: string
  numbers: string[]
  indicatedBy: IReferido[]
  indications: IReferido[]
  annotation?: string
  scheduling?: Date
}

class Referido implements IReferido {
  private _indicatedBy: IReferido[] = []
  private _indications: IReferido[] = []
  public scheduling: Date
  public annotation: string
  constructor(
    public readonly name: string,
    private _numbers: string[],
    indicatedBy: IReferido
  ) {
    this._indicatedBy.push(indicatedBy)
  }
  get numbers() {
    return this._numbers
  }
  get indicatedBy() {
    return this._indicatedBy
  }
  addToindicated(indicated: IReferido) {
    this._indicatedBy.push(indicated)
  }
  get indications() {
    return this._indications
  }
  addIndications(...indications: IReferido[]) {
    this._indications.push(...indications)
  }
}

const referido = new Referido("Matheus", null, null)
referido.indicatedBy[0] = referido

referido.indicatedBy.forEach((a) => {
  console.log(a.name)
})
