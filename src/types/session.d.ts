/**
 * 川渡りパズルのメニュー類の状態
 */
export interface Session {
  /**
   * このパズルについてダイアログ表示
   */
  introduction: boolean
  /**
   * ナビゲーションダイアログ表示
   */
  navigation: boolean
  /**
   * ナビゲーションのタブID
   */
  tab: number
  /**
   * BGM再生
   */
  sound: boolean
  /**
   * ルート探索ダイアログ表示
   */
  solve: boolean
}
