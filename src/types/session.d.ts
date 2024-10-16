/**
 * 川渡りパズルのメニュー類の状態
 */
export interface Session {
  /** ナビゲーションダイアログ表示 */
  navigation: boolean
  /** 履歴ダイアログ表示 */
  moves: boolean
  /** BGM再生 */
  sound: boolean
  /** ルート探索ダイアログ表示 */
  solve: boolean
}
