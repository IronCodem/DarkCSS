// Extra Whitespace
const whitespaceKeys = ['\s', '\t', '\n', '', ' '];

// Keys that apply to content.---
const specialKeysLevelOne = {
	place: 'float',
  placeText: 'text-align',
  color: 'color',
  width: 'width',
  height: 'height',
  display: 'display',
  font: 'font-family',
  fontSize: 'font-size',
  fontWeight: 'font-weight',
  space: 'letter-spacing',
  padding: 'padding',
  decoration: 'text-decoration'
};

// Keys that apply to content.---.---
const specialKeysLevelTwo = {
	fillColor: 'background',
  border: 'border'
};

// Make specialKeys immutable
Object.freeze(specialKeysLevelOne);
Object.freeze(specialKeysLevelTwo);

/**
 * tokenize - create css from darkcss
 * @param data {String} - darkcss code
 */
function tokenize(data) {
	// Remove whitespace
	const formatted = data
		.replace(/\s/g, '')
		.replace(/\t/g, '')
		.replace(/\n/g, '');
	
	// Remove blocking syntax	
	const split = formatted
		.replace(/\{/g, '\n')
		.replace(/\}/g, '\n')
		.replace(/;/g, '\n');
	
	// Seperate into array with tokens
	const tokens = split.split('\n');
	
	// Tree of raw tokens	
	const tokenTree = {};
	// Selector being used
	let currentSelector = '';

	// Take tokens and place into token tree
	for(i = tokens.length - 1; i > -1; i--) {
		const currentToken = tokens[tokens.length - i - 1];
		if(/^[a-zA-Z0-9_]+$/.test(currentToken) || /^\.[a-zA-Z0-9_]+$/.test(currentToken)) {
			currentSelector = currentToken;
			if(!tokenTree[currentSelector]) tokenTree[currentSelector] = [];
		} else if(/^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+=[a-zA-Z0-9_]+/.test(currentToken) || /^[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+\.[a-zA-Z0-9_]+=[a-zA-Z0-9_]+/.test(currentToken)) {
			tokenTree[currentSelector].push(currentToken);
		} else if(!whitespaceKeys.includes(currentToken)) {
			throw new Error('Unexpected Key When Parsing. Token:', currentToken);
    }
	}
	
	// Tree of tokens with proper formatting
	const finalTokens = {}
	// Take raw token tree and compare with special keys
	for (const [key, value] of Object.entries(tokenTree)) {
		if(!finalTokens[key]) finalTokens[key] = {};
		value.forEach((item) => {
			const formatted = item.replace('=', '.').split('.');
			// If the item does not have nested properties
			if(formatted.length === 3) {
				if(Object.prototype.hasOwnProperty.call(specialKeysLevelOne, formatted[1])) {
					finalTokens[key][specialKeysLevelOne[formatted[1]]] = formatted[2];
				} else {
					finalTokens[key][formatted[1]] = formatted[2];
				}
			// If the item does have nested properties
			} else {
				if(Object.prototype.hasOwnProperty.call(specialKeysLevelOne, formatted[1]) && Object.prototype.hasOwnProperty.call(specialKeysLevelTwo, formatted[2])) {
					finalTokens[key][`${specialKeysLevelOne[formatted[1]]}-${specialKeysLevelTwo[formatted[2]]}`] = formatted[3];
				} else if(Object.prototype.hasOwnProperty.call(specialKeysLevelOne, formatted[1])) {
					finalTokens[key][`${specialKeysLevelOne[formatted[1]]}-${formatted[2]}`] = formatted[3];
				} else if(Object.prototype.hasOwnProperty.call(specialKeysLevelTwo, formatted[2])) {
					finalTokens[key][`${formatted[1]}-${specialKeysLevelTwo[formatted[2]]}`] = formatted[3];
				} else {
					finalTokens[key][`${formatted[1]}-${formatted[2]}`] = formatted[3];
				}
			}
			
		});
	}
	
	// Final text for file
	let finalText = '';
	// Append each key-value to the final text
	for(const [key, value] of Object.entries(finalTokens)) {
		const thisBlock = `${key} {$}`;
		let properties = '';
		for(const [valueKey, valueValue] of Object.entries(value)) {
			properties += `\t${valueKey}: ${valueValue};\n`;
		}
		const finalBlock = thisBlock.replace('$', `\n${properties}`);
		finalText += `${finalBlock}\n`;
	}
	return finalText;
}

module.exports = tokenize;