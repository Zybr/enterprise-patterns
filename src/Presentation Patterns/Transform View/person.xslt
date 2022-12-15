<?xml version="1.0"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform" version="1.0">

    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="person">
        <record>
            <xsl:apply-templates select="@*|*"/>
        </record>
    </xsl:template>

    <xsl:template match="firstName">
        <fullname>
            <xsl:apply-templates/>
            <xsl:apply-templates select="following-sibling::lastName" mode="fullname"/>
        </fullname>
    </xsl:template>

    <xsl:template match="lastName"/>

    <xsl:template match="lastName" mode="fullname">
        <xsl:text> </xsl:text>
        <xsl:apply-templates/>
    </xsl:template>

</xsl:stylesheet>
