export function getFileType(mime){
    // types: 'image', 'doc', 'xls', 'zip', 'pdf', 'ppt', 'txt', 'undefined'
    const [_type, format] = mime.split('/');
    const images = ['png','tiff', 'webp', 'jpeg', 'gif', 'jpg', 'bmp', 'pjpeg'];
    const pdf = ['pdf', 'pub'];
    const docs = [
        'doc', 'docx', 
        'msword', 
        'x-starwriter',
        'vnd.openxmlformats-officedocument.wordprocessingml.document', 
        'vnd.oasis.opendocument.text',
        'vnd.oasis.opendocument.text-template',
        'vnd.sun.xml.writer',
        'vnd.stardivision.writer',
        'rtf'
    ];
    const spreadsheet = [
        'csv',
        'excel',
        'msexcel',
        'x-starcalc',
        'vnd.ms-excel',
        'vnd.sun.xml.calc',
        'vnd.stardivision.calc',
        'vnd.oasis.opendocument.spreadsheet',
        'vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'x-comma-separated-values',
        'comma-separated-values',
    ];
    const presentation = [
        'vnd.openxmlformats-officedocument.presentationml.slideshow',
        'vnd.ms-powerpoint.template.macroEnabled.12',
        'vnd.openxmlformats-officedocument.presentationml.template',
        'vnd.ms-powerpoint.addin.macroEnabled.12',
        'vnd.openxmlformats-officedocument.presentationml.slideshow',
        'vnd.openxmlformats-officedocument.presentationml.presentation',
    ]
    const zip = ['x-zip', 'zip', 'x-zip-compressed', 'x-rar', 'rar']
    const txt = ['txt', 'plain']

    if (images.includes(format)) return 'image'
    if (docs.includes(format)) return 'doc'
    if (pdf.includes(format)) return 'pdf'
    if (spreadsheet.includes(format)) return 'xls'
    if (presentation.includes(format)) return 'ppt'
    if (zip.includes(format)) return 'zip'
    if (txt.includes(format)) return 'txt'
    return 'undefined'


}