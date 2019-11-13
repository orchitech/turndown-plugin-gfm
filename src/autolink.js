export default function autolink (turndownService) {
  turndownService.addRule('autolink', {
    filter: function (node) {
      return node.nodeType === 3 && !node.isInLink
    },
    replacement: function (content, node, options, replacer) {
      // https://github.github.com/gfm/#autolinks-extension
      const beginning = /(?:^|\s+|\*|_|~|\()/
      const domain = /(?:[a-zA-Z0-9_-]+\.?)+/
      const uriAutolink = new RegExp(beginning.source + /(?:(?:ftp|https?):\/\/|www\.)/.source + domain.source + /[^< ]*/.source)
      const emailAutolink = new RegExp(beginning.source + /[A-Za-z0-9._+-]+@(?:[a-zA-Z0-9_-]+\.)+[^_-]/.source)
      const autolink = new RegExp(`${uriAutolink.source}|${emailAutolink.source}`, 'g')

      let result = ''
      let lastMatchedIndex = 0
      let nodeValue = node.nodeValue
      let match = autolink.exec(nodeValue)
      // escape the part before autolink and don't escape the index itself
      while (match) {
        result += replacer.replace(nodeValue.substring(lastMatchedIndex, match.index))
        result += match[0]
        lastMatchedIndex = match.index + match[0].length
        match = autolink.exec(nodeValue)
      }
      // escape the rest of the content after last autolink
      result += replacer.replace(nodeValue.substring(lastMatchedIndex))

      return result
    }
  })
}
