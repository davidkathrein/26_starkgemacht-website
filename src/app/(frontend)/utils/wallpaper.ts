const AVAILABLE_COLORS = ['green', 'blue', 'purple', 'brown'] as const
export function getRandomWallpaperColor() {
  return pick(AVAILABLE_COLORS)
}

export function getWallpaperColorFromIndex(index: number) {
  return AVAILABLE_COLORS[index % AVAILABLE_COLORS.length]
}

function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}
