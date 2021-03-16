import * as emoji from 'node-emoji';

class Log {

    public async successLog(str: string, headline?: string) {
    
        let _headline = headline ? `${headline}` : "";
    
        console.log(`${emoji.get('heavy_check_mark')}  ${_headline}: ${str}`);
    
    }
    
    public async errorLog(str: string, headline?: string) {
    
        let _headline = headline ? `${headline}` : "";
    
        console.log(`${emoji.get('skull_and_crossbones')}  ${_headline}: ${str}`);
    
    }
    
    public async warningLog(str: string, headline?: string) {
    
        let _headline = headline ? `${headline}` : "";
    
        console.log(`${emoji.get('warning')}  ${_headline}: ${str}`);
    
    }

}

export default Log;