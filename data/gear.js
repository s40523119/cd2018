function Calculate()
{
	// validation
	document.getElementById('status').innerText = "";
	if( document.forms['calc'].module.value == '' || isNaN(document.forms['calc'].module.value) )
	{
		document.getElementById('status').innerText = 'Error in Module';
		document.forms['calc'].module.focus();
		return;
	}

	if( document.forms['calc'].pressureangle.value == '' || isNaN(document.forms['calc'].pressureangle.value) )
	{
		document.getElementById('status').innerText = 'Error in pressureangle';
		document.forms['calc'].pressureangle.focus();
		return;
	}

	if( document.forms['calc'].teeth.value == '' || isNaN(document.forms['calc'].teeth.value) )
	{
		document.getElementById('status').innerText = 'Error in Number of teeth';
		document.forms['calc'].teeth.focus();
		return;
	}

	if( document.forms['calc'].shift.value == '' || isNaN(document.forms['calc'].shift.value) )
	{
		document.getElementById('status').innerText = 'Error in Profile Shift';
		document.forms['calc'].shift.focus();
		return;
	}

	var nModule = Number(document.forms['calc'].module.value);
	var nPressureAngle = Number(document.forms['calc'].pressureangle.value);
	var nTeeth = Number(document.forms['calc'].teeth.value);
	var fProfileShift = Number(document.forms['calc'].shift.value);

	var nRefDiameter = nModule * nTeeth;
	var fBaseDiameter = nRefDiameter * Math.cos( nPressureAngle * Math.PI / 180 );
	var fBaseRadius = fBaseDiameter / 2;
	var fTipDiameter = nRefDiameter + 2 * nModule * (1 + fProfileShift);
	var fTipRadius = fTipDiameter / 2;
	var fTipPressureAngle = Math.acos(fBaseDiameter / fTipDiameter) * 180 / Math.PI;
	var fInvAlpha = Math.tan(nPressureAngle * Math.PI / 180) - nPressureAngle * Math.PI / 180;
	var fInvAlphaA = Math.tan(fTipPressureAngle * Math.PI / 180) - fTipPressureAngle * Math.PI / 180;
	var fTopThickness = Math.PI / (2 * nTeeth) + (2 * fProfileShift * Math.tan(nPressureAngle * Math.PI / 180)) / nTeeth + fInvAlpha - fInvAlphaA;
	var fTopThicknessDegrees = fTopThickness * 180 / Math.PI;
	var fCrestWidth = fTipDiameter * fTopThickness;

	document.forms['calc'].refdiameter.value = nRefDiameter;
	document.forms['calc'].basediameter.value = fBaseDiameter.toFixed(4);
	document.forms['calc'].baseradius.value = fBaseRadius.toFixed(4);
	document.forms['calc'].tipdiameter.value = fTipDiameter;
	//document.forms['calc'].tippressureangle.value = fTipPressureAngle;
	//document.forms['calc'].invalpha.value = fInvAlpha;
	//document.forms['calc'].invalphaa.value = fInvAlphaA;
	//document.forms['calc'].tipthickness.value = fTopThicknessDegrees;
	//document.forms['calc'].crestwidth.value = fCrestWidth;

	//document.forms['calc'].tooththickness.value = 2 * ((90 / nTeeth) + ( 360 * fProfileShift * Math.tan(nPressureAngle * Math.PI / 180) ) / Math.PI / nTeeth);

	document.forms['calc'].xuv.value = fBaseRadius.toFixed(4) + " * (cos(u) + u * sin(u))";
	document.forms['calc'].yuv.value = fBaseRadius.toFixed(4) + " * (sin(u) - u * cos(u))";
	document.forms['calc'].zuv.value = "0";

	document.forms['calc'].umin.value = "0";
	document.forms['calc'].umax.value = Math.sqrt( fTipRadius * fTipRadius / fBaseRadius / fBaseRadius - 1).toFixed(4); // sqrt( R^2/r^2 - 1)
	document.forms['calc'].ustep.value = "10";

	// V is not used
	document.forms['calc'].vmin.value = "0";
	document.forms['calc'].vmax.value = "0";
	document.forms['calc'].vstep.value = "1";

	// Calculate angular tooth width along the base diameter.
	var x1, x2, y1, y2;
	var umax = Math.sqrt( fTipRadius * fTipRadius / fBaseRadius / fBaseRadius - 1);
	x1 = fBaseRadius;
	y1 = 0;
	x2 = fBaseRadius * ( Math.cos( umax ) + umax * Math.sin( umax ) );
	y2 = fBaseRadius * ( Math.sin( umax ) - umax * Math.cos( umax ) );

	// distance between beginning and end of the involute curve
	var d = Math.sqrt( ( x1 - x2 ) * ( x1 - x2 ) + ( y1 - y2 ) * ( y1 - y2 ) );
	var cosx = (fBaseRadius * fBaseRadius + fTipRadius * fTipRadius - d * d) / 2 / fBaseRadius / fTipRadius;


	var basetooththickness = 2 * fTopThicknessDegrees + 2 * Math.acos(cosx) * 180 / Math.PI;
	document.forms['calc'].basetooththickness.value = basetooththickness.toFixed( 4 );
}

function ShowHideInstructions()
{
	var i = document.getElementById('instructions');
	var b = document.getElementById('showhide');

	if(i.style.display == 'block')
	{
		i.style.display = 'none';
		b.value = 'Show Diagram';
	}
	else
	{
		i.style.display = 'block';
		b.value = 'Hide Diagram';
	}
}

function OnLoad()
{
	//var instructions = document.getElementById('instructions');
	//instructions.style.display = 'none';
}
