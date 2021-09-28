
export default function checkReportErrors (report, section, user) {
    if(!report.title1) { return true };
    if(!report.title2) { return true };
    if(!report.photo1) { return true };
    if(!report.paragraph1) { return true };
    if(!section) { return true };
    if(!user) { return true }

    return false;
}