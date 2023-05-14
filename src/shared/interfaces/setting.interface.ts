export interface ISetting {
  theme: string
  banner: string
  rounded: 0 | 1 | 2 | 3
}

export interface ITheme {
  label: string
  value: string
}

export interface IBanner {
  name: string
  bannerUrl: string
}
