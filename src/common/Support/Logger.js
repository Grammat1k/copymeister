import * as signale from 'signale';
import * as Figures from 'figures';

function _formatScopeName()
{
    let scopeString = `[${this._scopeName}]`;
    if (Array.isArray(this._scopeName)) {
        const scopes = this._scopeName.filter(x => x.length !== 0);
        scopeString = `${scopes.map(x => `[${x.trim()}]`).join(' ')}`;
    }

    return `${' '.repeat(this._config.longestScopeName - (scopeString.length - 2))}${scopeString}`;
}

signale._formatScopeName = _formatScopeName;
signale.Signale.prototype._formatScopeName = _formatScopeName;

signale.config({
    displayTimestamp: true,
    displayDate: false,
    displayBadge: process.platform !== 'win32',

    longestScopeName: 35,
});

export default signale;
