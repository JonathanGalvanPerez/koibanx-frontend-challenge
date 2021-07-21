export default interface CommerceQuery {
  q?: {
    $and?: [
      $or: [
        name: string,
        cuit: string,
        id: string
      ],
      active: boolean
    ],
    $or?: [
      name: string,
      cuit: string,
      id: string
    ],
    active?: boolean
  },
  sort: string,
  page: number,
  limit: number
}