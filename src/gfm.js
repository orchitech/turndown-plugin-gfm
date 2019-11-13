import highlightedCodeBlock from './highlighted-code-block'
import strikethrough from './strikethrough'
import tables from './tables'
import taskListItems from './task-list-items'
import autolink from './autolink'

function gfm (turndownService) {
  turndownService.use([
    highlightedCodeBlock,
    strikethrough,
    tables,
    taskListItems,
    autolink
  ])
}

export { gfm, highlightedCodeBlock, strikethrough, tables, taskListItems, autolink }
